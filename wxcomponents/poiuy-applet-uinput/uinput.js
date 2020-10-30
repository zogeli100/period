Component({
	behaviors: ['wx://form-field'],
	properties: {
		value: {
			type: String,
			value: ''
		}, //值 文本内容 默认值 ''
		type: {
			type: String,
			value: 'text'
		}, //值 初始值  默认值 'text' 可选：tel|number|verifyCode|email|idcard 或者其他原生属性
		name: {
			type: String
		}, //name
		placeholder: {
			type: String,
			value: ''
		},
		noClear:{  //初始值 false 没有清空显示
			type: Boolean,
			value: false 
		},
		disabled:{
			type: Boolean,
			value: false 
		},
		maxlength: {
			type: Number,
			value: '25'
		}, //长度 默认25
		borderAnimation:{
			//输入框边线 入场动画 可选参数 left | center | right | none
			type: String,
			value: 'left'
		},
		borderInput:{
			type: Boolean,
			value: false
		},
		label:{
			type: String,
			value:''
		},
		isNextIcon:{
			type: Boolean,
			value: false
		},
		mustFill:{
			type: Boolean,
			value: true
	},
	picker:{
		type: Boolean,
		value: false
	},
	pickerData:{
		type:Array
	},
	pickerDefault:{
		type:String
	},
	canSendCode:{
		type:Boolean,
		value:true
	}
	},
	data: {
		tipMsg: '',
		error: null,
		hasValue:false,
		openEyes:false,
		dataType:null,
		codeTxt:'获取验证码',
		countimg:false,
		currCountDown:60,
		pickerFale:false
	},
	attached() {
		this.setData({
			dataType:this.properties.type
		});
		if(this.properties.type=='tel'){
			this.setData({
				type:'number',
				maxlength:11
			})
			return;
		}
		if(this.properties.type=='number'){
			this.setData({
				type:'number'
			})
			return;
		}
		if(this.properties.type=='idcard'){
			this.setData({
				type:'idcard',
				maxlength:18
			})
			return;
		}
	},
	methods: {
		onLoad: function() {
			const _this = this;
		},
		input_input(e){
			if(e.detail.value){
				this.data.hasValue = true;
			}else{
				this.data.hasValue = false;
			}
			this.setData({
				hasValue:this.data.hasValue,
				value: e.detail.value
			})
		},
		input_blur(e) {
			if (this.properties.mustFill) {
				if (e.detail.value) {
					this.data.error = false
					let input = e.detail.value;
					if (this.data.dataType == 'tel') {
						if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/).test(input)) {
							this.data.tipMsg = '手机号格式不正确'
							this.data.error = true;
						} else {
							this.data.error = false
						}
					}
					if (this.data.dataType == 'email') {
						if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(input)) {
							this.data.tipMsg = '邮箱格式不正确'
							this.data.error = true;
						} else {
							this.data.error = false
						}
					}

					if (this.data.dataType == 'idcard') {
						if (!this.data.identity_card.test(input)) {
							this.data.tipMsg = '身份证格式不正确'
							this.data.error = true;
						} else {
							this.data.error = false
						}
					}

					if (this.data.dataType == 'bankcard') {
						if (input.length < 16 || input.length > 19) {
							this.data.tipMsg = '银行卡号长度为16位~19位'
							this.data.error = true;
						} else {
							this.data.error = false
						}
					}

					this.setData({
						error:this.data.error,
						tipMsg:	this.data.tipMsg,
						// value:input
					})
				} else {
					this.setData({
						error:true,
						tipMsg:this.properties.placeholder || "",
						// value:input
					})
				}
				if(!this.data.error){
					this.triggerEvent('getValue', e.detail.value)
				}else{
					this.triggerEvent('getValue', false)
				}
			} else {
				this.triggerEvent('getValue', e.detail.value)
			}
		},
		clearInput(){
			this.setData({
				value:'',
				hasValue:false,
				error:false
			})
		},

		openEyes(){
			this.data.openEyes = !this.data.openEyes;
			if(this.data.openEyes){
				this.setData({
					openEyes:this.data.openEyes,
					type:'text',
				})
			}else{
				this.setData({
					openEyes:this.data.openEyes,
					type:'password',
				})
			}
		},
		countime(){
			const _this =this;
				if(!_this.data.countimg&&this.properties.canSendCode){
						this.countDownFun();
						this.triggerEvent('counting');
				}
		},
		countDownFun() {
			const _this = this;
			let timer = setInterval(function() {
				if (_this.data.currCountDown <= 0) {
					_this.data.currCountDown = 60
					_this.setData({
						countimg:false,
						codeTxt:"获取验证码"
					})
					clearInterval(timer);
					return;
				} else {
					_this.setData({
						countimg:true,
						codeTxt:"重新获取(" + _this.data.currCountDown + ")"
					})
					_this.data.currCountDown--;
				}
			}, 1000);
		},

		bindPickerChange(e){
			if(e.detail){
					this.setData({
						pickerFale:true,
						valueName:this.properties.pickerData[e.detail.value].name,
						value: this.properties.pickerData[e.detail.value].id
					})
					this.triggerEvent('pickerValue',this.properties.pickerData[e.detail.value]);
			}
		},

	}

})
