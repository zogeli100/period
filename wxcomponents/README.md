
## 插件安装
#### 输入框组件  待更多功能更新

##### 导入
> 将组件文件放在项目的compoments里，在小程序需要用到组件的页面的json文件里使用 "usingComponents":{"uInput": "/compoments/uinput/uinput"},即可

----------------------------------		
#### *注意 修改width时 可以使用一个块级元素包裹起来 因为内部插件是100%宽度

> using:
#### 属性 attribute
1. **value** 用于get 和 set 的值 
2. **name** 和原生一样的name属性 用于表单
3. **type** 输入框类型。默认为text 
>>> 可选值 text|tel|email|number|digit(带小数点类型)|idcard(身份证类型)|password|bankcard(银行卡号)|msgcode(短信验证码)|textarea
4. **noClear** 关闭清空模式
5. **disabled** 是否禁用 默认为false
6. **label** 标题文本 如果没有写就不会出现标题
7. **placeholder** 输入框提示语
8. **maxlength** 最大长度  默认为70 可以自行输入 注意：长度会根据不同输入框类型自动更换长度
9. **mustFill** 不做验证 默认为false
10. **borderInput** 是否存在边框  默认*false*  对应属性 **borderAnimation**下划线进入动画 可选值 *left* | *center* | *right* 默认为 *left* 
11. **isNextIcon** 是否出现下一步箭头 默认为false  *后续会更新为自定义icon或者图片*
12. **picker** 是否是小程序下拉框 暂时只支持1级选择 默认为false
13. **pickerData** 传入给picker的数组 格式为 *[{name:'a',id:'1'},{name:'b',id:'2'}]*
----------------------------------	

#### 短信验证码专属属性  
* **canSendCode** 是否能发送 可以先判断号码框是否填写后传入 用于触发倒计时功能 默认值为false

----------------------------------	

#### 方法 method 
*  *getValue* > 失去焦点触发得到Input框的值  *例：bind:getValue="getInputValue"*   
>>>用法提示 如果有无限累加该组件的功能， 可以使用循环得到的下标赋值到组件上 例如：
```
<block wx:for="{{array}}" wx:for-index="index" wx:key="index">
 <uInput value="{{testInput}}" borderInput label="测试内容2" data-index="{{index}}" bind:getValue="getInputValue" ></uInput>
</block>
```
这样的方法即可完成无限累加功能的添加修改，如有不清楚的地方可以评论联系我，我给你完整的示例代码。
-----------------------------------
*  *pickerValue* > 直接得到传入的数组的 id属性值 *例：bind:pickerValue="getPickerValue" *
		
* 短信验证码框专属方法 counting 已开始倒计时回调方法 没有返回值 *例： bind:counting="getCode"*

----------------------------------	

### 示范代码 

#### wxml
```<view style="width:90%;margin:30rpx auto">
		<form bindsubmit="formSubmit" bindreset="reset">
	  	<uInput name="testInput"  value="{{testInput}}" borderInput label="测试内容" placeholder="请输入测试内容"  ></uInput>
      <uInput name="testInputEmail"  value="{{testInput}}" borderInput label="测试内容2" type="email" ></uInput>
			<uInput name="testPicker" value="{{testPicker}}" borderInput label="测试类型" placeholder="请选择测试类型" picker pickerData="{{testList}}" ></uInput>
    <button type="primary" formType="submit">提交</button>
    </form>
</view>
```
#### test.js

```
Page({

  /**
   * 页面的初始数据
   */
  data: {
      testList:[{
        name:'测试1',
        id:'1'
      },{
        name:'测试2',
        id:'2'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formSubmit(e){
      console.log(e);
  },
})
```

#### test.json

```
{
  "usingComponents": {"uInput": "/control/uinput/uinput"},
  "navigationBarTitleText": "测试"
}
```

##### 发现问题请及时在评论区给我反馈，谢谢大家的指正，如果好用请给个好评哦~

	