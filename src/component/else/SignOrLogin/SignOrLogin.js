import axios from 'axios';
import React from 'react';
import { ReInput, ReButton } from '../formEle/formEle'
import Verify from '../verifyCode/Verify';
import './card.css'
class SignOrLogin extends React.Component {
    state = {
        showCard: false,
        isLogin: false,
        VerifyEle: '',
        code: '',
        isVerified: false,
    }
    switchDisplay = () => {
        let { showCard } = this.state;
        this.setState({
            showCard: !showCard,
        })
    }
    changeState = (e) => {
        this.setState({
            code: e.target.value,
        })
    }
    switchLog = () => {
        let { isLogin } = this.state;
        this.setState({
            isLogin: !isLogin,
        })
        if (!isLogin) {
            this.setState({
                VerifyEle: '',
            })
        }
    }
    verify = () => {
        this.axios({
            url: "register/step1",
            method: "POST",
            params: {
                sign1: this.state.code
            }
        }).then(res => {
            let { data } = res;
            if (data.code === 200) {
                console.log('good');
                this.setState({
                    VerifyEle: '',
                    isVerified: true,
                })
            }
            alert(data.message);
        })
    }
    getCode = () => {
        this.axios({
            url: "register/step1",
        }).then((res) => {
            let { data } = res;
            this.setState({
                VerifyEle: () => {
                    return (
                        <Verify imgUrl={data.image} changeState={this.changeState} code={this.state.code} verify={this.verify} />
                    )
                }
            })
        })
    }


    render() {
        return (
            <div className='SignOrLogin'>
                <span className='SignBtn' onClick={() => {
                    this.setState({
                        isLogin: false,
                        showCard: true,
                    })
                }}>??????</span>
                <span>???</span>
                <span className='loginBtn' onClick={() => {
                    this.setState({
                        isLogin: true,
                        showCard: true,
                    })
                }}>??????</span>
                {this.state.showCard ? <LogCard isVerified={this.state.isVerified} getCode={this.getCode} VerifyEle={this.state.VerifyEle} switchLog={this.switchLog} switchDisplay={this.switchDisplay} isLogin={this.state.isLogin} /> : ''}
            </div>
        )
    }
}
class LogCard extends React.Component {
    static defaultProps = {
        isLogin: false,
    }
    state = {
        mail: "",
        code: "",
        user: "like_gang",
        pass: "147258",
        selectVal: "@qq.com",
    }
    sendMailCode = () => {
        if (!this.state.mail) {
            return alert('???????????????');
        }
        this.axios({
            url: "register/step2",
            params: {
                sign2: this.state.mail ? 'true' : 'false',
                email_address: this.state.mail + this.state.selectVal,
            }
        }).then(res => {
            let { data } = res;
            console.log(data);
        })
    }
    changeHandler(statePropName) {
        return (e) => {
            this.setState({
                [statePropName]: e.target.value,
            })
        }
    }

    changeSelect = (val) => {
        this.setState({
            selectVal: val,
        })
    }

    login = () => {
        let { user, pass } = this.state;
        if (!user || !pass) {
            return alert('?????????????????????');
        }
        axios({
            url: "/login",
            params: {
                account: user,
                password: pass,
            },
            withCredentials: false,
        }).then((res) => {
            let { token } = res.data;
            localStorage.setItem('token',token);
            this.axios.interceptors.request.use(config => {
                config.headers.Token =token;
                return config;
            })
            if (res.data.code === 200) {
                axios({
                    url: "/user",
                }).then(res => {
                    console.log(res.data)
                })
            }
        })
    }
    sign = () => {
        let { mail, code } = this.state;
        if (!mail || !code) {
            return alert('?????????????????????');
        }

        this.axios({
            url: "register/step2",
            method: "POST",
            params: {
                tp_code: code,
            }
        }).then(res => {
            let { message } = res.data;
            alert(message);
        })
    }


    render() {
        let { isLogin } = this.props;
        let { user, pass } = this.state;
        let { mail, code } = this.state;
        let { VerifyEle, getCode } = this.props;
        let { isVerified } = this.props;
        return (
            <div className="Curtain">
                <div className="Card">
                    <div className="LogWrapper">
                        <img src={require('../../../assets/img/logo.jpeg')} className='logo log-login' alt='logo pic' />
                        <span className='PjName selectItemName'>??????</span>
                    </div>
                    {!isLogin ?
                        <ReInput placeholder='??????????????????' isShowSelect={true} selectObj={{
                            hasBorder: true,
                            placeholder: "????????????",
                        }}
                            value={mail}
                            changeHandler={this.changeHandler('mail')}
                            changeSelect={this.changeSelect}
                            selectVal={this.state.selectVal}
                        /> :
                        (
                            <ReInput placeholder='??????'
                                value={user}
                                changeHandler={this.changeHandler('user')}
                            />
                        )
                    }
                    {VerifyEle ? <VerifyEle /> : ''}
                    {!VerifyEle ? (!isLogin ? <ReInput placeholder='?????????' isShowBtn={true} btnObj={{
                        content: "???????????????",
                        handler: !isVerified ? getCode : this.sendMailCode,
                    }}
                        value={code}
                        changeHandler={this.changeHandler('code')}
                    /> : <ReInput placeholder='????????????' type='password'
                        value={pass}
                        changeHandler={this.changeHandler('pass')}
                    />) : ''}

                    <ReButton content={!isLogin ? '??????/??????' : '??????'} style={
                        {
                            height: '40px',
                            lineHeight: '40px',
                            backgroundColor: 'rgb(36, 37, 40)',
                            color: 'white',
                            borderRadius: '10px',
                            marginBottom: '16px',
                        }
                    }
                        handler={isLogin ? this.login : this.sign}
                    />
                    <p className='prompt'>
                        <span onClick={this.props.switchLog}>{isLogin ? '????????????/???????????????' : '??????????????????'}</span>
                        <span>????????????</span>
                    </p>
                    <p className='xieyi'>
                        ????????????????????????????????? <a href="www.baidu.com">??????????????????</a> ??? <a href="www.baidu.com">??????????????????</a>
                    </p>
                    <div className='closeBtn' onClick={this.props.switchDisplay}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path fillRule="evenodd" d="M13.414 12L19 17.586A1 1 0 0117.586 19L12 13.414 6.414 19A1 1 0 015 17.586L10.586 12 5 6.414A1 1 0 116.414 5L12 10.586 17.586 5A1 1 0 1119 6.414L13.414 12z" clipRule="evenodd"></path></svg>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignOrLogin