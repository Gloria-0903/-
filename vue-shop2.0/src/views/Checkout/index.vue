<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="showAddDialog = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
   <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="address-count" v-if="checkInfo.userAddresses && checkInfo.userAddresses.length > 0">
        共 {{ checkInfo.userAddresses.length }} 个地址
      </div>
      <div class="text item" v-for="item in checkInfo.userAddresses" :key="item.id">
        <div class="address-content" @click="switchAddress(item)" :class="{active: activeAddress?.id === item.id}">
          <ul>
            <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
            <li><span>联系方式：</span>{{ item.contact }}</li>
            <li><span>收货地址：</span>{{ item.address }}</li>
          </ul>
        </div>
        <div class="delete-btn" @click.stop="showDeleteConfirm(item)">
          <i class="iconfont icon-close">×</i>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  
  <el-dialog v-model="showDeleteDialog" title="确认删除" width="30%" center>
    <div class="delete-confirm">
      <p>确定要删除这个收货地址吗？</p>
      <div class="address-preview" v-if="addressToDelete">
        <p><strong>收货人：</strong>{{ addressToDelete.receiver }}</p>
        <p><strong>联系方式：</strong>{{ addressToDelete.contact }}</p>
        <p><strong>收货地址：</strong>{{ addressToDelete.address }}</p>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDeleteDialog = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确定删除</el-button>
      </span>
    </template>
  </el-dialog>
  
  <!-- 添加地址 -->
  <el-dialog v-model="showAddDialog" title="添加收货地址" width="35%" center>
    <el-form :model="addressForm" :rules="addressRules" ref="addressFormRef" label-width="100px">
      <el-form-item label="收货人" prop="receiver">
        <el-input v-model="addressForm.receiver" placeholder="请输入收货人姓名" />
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="addressForm.contact" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input 
          v-model="addressForm.address" 
          type="textarea" 
          :rows="3"
          placeholder="请输入收货地址"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="addressForm.isDefault">设为默认地址</el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="submitAddress">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
    import { getCheckoutInfoAPI, createOrderAPI, addAddressAPI, deleteAddressAPI } from '@/apis/checkout';
    import type { CheckoutInfo, CheckoutAddress } from '@/apis/checkout';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useCartStore } from '@/stores/cartStore';
    import { ElMessage } from 'element-plus';

    const router = useRouter()
    const showDialog = ref(false)
    const showAddDialog = ref(false)
    const showDeleteDialog = ref(false)
    const cartStore = useCartStore()
    const addressFormRef = ref()
    const addressToDelete = ref<CheckoutAddress | null>(null)

    const checkInfo = ref<CheckoutInfo>({
      goods: [],
      summary: { goodsCount: 0, totalPrice: 0, totalPayPrice: 0, postFee: 0, discountPrice: 0 },
      userAddresses: []
    })

    const curAddress = ref<CheckoutAddress | null>(null)

    const addressForm = ref({
      receiver: '',
      contact: '',
      address: '',
      isDefault: false
    })

    const addressRules = {
      receiver: [
        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
      ],
      contact: [
        { required: true, message: '请输入联系方式', trigger: 'blur' }
      ],
      address: [
        { required: true, message: '请输入收货地址', trigger: 'blur' },
      ]
    }



    const getCheckInfo = async () => {
        try {
            const res = await getCheckoutInfoAPI() as any
            checkInfo.value = res.result
            
            if (checkInfo.value.userAddresses && checkInfo.value.userAddresses.length > 0) {
                curAddress.value = checkInfo.value.userAddresses.find(a => a.isDefault === 0) || checkInfo.value.userAddresses[0] || null
            } else {
                curAddress.value = null
            }
            
            console.log('地址列表已更新:', checkInfo.value.userAddresses)
        } catch (error) {
            console.error('获取结算信息失败:', error)
            ElMessage.error('获取结算信息失败，请刷新页面重试')
        }
    }
    onMounted(() => getCheckInfo() )

    const activeAddress = ref<CheckoutAddress | null>(null)
    const switchAddress = (item: CheckoutAddress) => {
      activeAddress.value = item
    }

    const confirm = () => {
      curAddress.value = activeAddress.value
      showDialog.value = false
      activeAddress.value = null
    }

    const showDeleteConfirm = (address: CheckoutAddress) => {
      addressToDelete.value = address
      showDeleteDialog.value = true
    }

    const confirmDelete = async () => {
      if (!addressToDelete.value) return
      
      try {
        const res = await deleteAddressAPI(addressToDelete.value.id) as any
        console.log('删除地址响应:', res)
        
        if (res.code === '1') {
          ElMessage.success('地址删除成功！')
     
          showDeleteDialog.value = false
          addressToDelete.value = null
          
          await getCheckInfo()
          
          if (activeAddress.value?.id === addressToDelete.value?.id) {
            activeAddress.value = null
          }
          
          if (curAddress.value?.id === addressToDelete.value?.id) {
            if (checkInfo.value.userAddresses.length > 0) {
              curAddress.value = checkInfo.value.userAddresses[0]
            } else {
              curAddress.value = null
            }
          }
        } else {
          throw new Error(res.msg || '删除地址失败')
        }
      } catch (error) {
        console.error('删除地址失败:', error)
        const errorMsg = error instanceof Error ? error.message : '删除地址失败，请重试'
        ElMessage.error(errorMsg)
      }
    }

    const submitAddress = async () => {
      try {
        await addressFormRef.value.validate()
        
        const addressData = {
          receiver: addressForm.value.receiver,
          contact: addressForm.value.contact,
          address: addressForm.value.address,
          isDefault: addressForm.value.isDefault ? 0 : 1
        }
        
         const fallbackRegion = {
           provinceCode: curAddress.value?.provinceCode || '110000',
           cityCode: curAddress.value?.cityCode || '110100',
           countyCode: curAddress.value?.countyCode || '110101'
         }
         
         const res = await addAddressAPI({ ...fallbackRegion, ...addressData }) as any
         console.log('添加地址响应:', res)
         
         if (res.code === '1') {
           ElMessage.success('地址添加成功！')
         } else {
           throw new Error(res.msg || '添加地址失败')
         }
        
        showAddDialog.value = false
        
        addressForm.value = {
          receiver: '',
          contact: '',
          address: '',
          isDefault: false
        }
        
        await getCheckInfo()
        
        if (addressForm.value.isDefault) {
          const newAddress = checkInfo.value.userAddresses.find(addr => 
            addr.receiver === addressForm.value.receiver && 
            addr.contact === addressForm.value.contact
          )
          if (newAddress) {
            curAddress.value = newAddress
          }
        }
        
      } catch (error) {
        console.error('添加地址失败:', error)
        const errorMsg = error instanceof Error ? error.message : '添加地址失败，请重试'
        ElMessage.error(errorMsg)
      }
    }

    const createOrder = async () => {
      const res = await createOrderAPI({
        deliveryTimeType: 1,
        payType: 1,
        payChannel: 1,
        buyerMessage: '',
        goods: checkInfo.value.goods.map(item => {
          return {
            skuId: item.skuId,
            count: item.count
          }
        }),
        addressId: curAddress.value?.id
      }) as any
      const orderId = res.result.id
      router.push({
        path: '/pay',
        query: {
          id: orderId
        }
      })
      cartStore.updateNewList()
  }

</script>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
  
  .address-count {
    text-align: center;
    padding: 10px;
    color: #666;
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
  }
}

// 删除确认对话框样式
.delete-confirm {
  text-align: center;
  
  p {
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }
  
  .address-preview {
    text-align: left;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    
    p {
      margin-bottom: 8px;
      font-size: 14px;
      color: #666;
      
      strong {
        color: #333;
      }
    }
  }
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .address-content {
      flex: 1;
      cursor: pointer;
      padding: 10px;
      min-height: 90px;
      display: flex;
      align-items: center;

      &.active,
      &:hover {
        background: lighten($xtxColor, 50%);
      }

      >ul {
        padding: 0;
        font-size: 14px;
        line-height: 30px;
      }
    }

    .delete-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #999;
      transition: all 0.3s ease;

      &:hover {
        color: #ff4757;
        background: rgba(255, 71, 87, 0.1);
        border-radius: 50%;
      }

      i {
        font-size: 18px;
      }
    }
  }
}

// 添加地址表单样式
:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-input),
:deep(.el-textarea) {
  .el-input__wrapper {
    border-radius: 4px;
  }
}

:deep(.el-cascader) {
  .el-input__wrapper {
    border-radius: 4px;
  }
}

:deep(.el-checkbox) {
  .el-checkbox__label {
    color: #666;
  }
}

</style>