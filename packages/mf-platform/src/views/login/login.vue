<template>
<div class="login-layout">
  <div class="left-layout">
    <div class="logo-layout">
    </div>
    <h1>Alement Studio</h1>
    <h2></h2>
    <h3></h3>
    <div class="inset-layout"></div>
  </div>
  <div class="right-layout">
    <div class="i18n-layout">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item of i18nList" :key="item.key">
          <span class="i18n-item"  v-bind:class="{'active': $i18n.locale === item.key}"  @click="changeLang(item.key)">
            {{ $t(`i18n.${item.key}`) }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-layout">
      <h1>用户登录</h1>
      <el-form :model="form" :rules="rules" ref="form" label-width="0" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" :placeholder="$t('login.usernamePlaceholder')">
            <i class="el-icon-user el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('login.passwordPlaceholder')">
            <i class="el-icon-lock el-input__icon" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="forgot-pass-item">
          <el-button type="text">忘记密码?</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('form')">{{ $t('login.loginBtnText') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="licence-layout">
    </div>
  </div>
</div>
</template>
<script>
import { i18nList, LOGIN_ACTION } from 'mf-shared-dependencies-vue'
export default {
  created () {
    console.log(this)
  },
  data () {
    return {
      i18nList,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeLang (lang) {
      console.log('changeLang', lang)
      this.$i18n.locale = lang
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(LOGIN_ACTION, this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~mf-shared-dependencies-vue/src/styles/variable.scss';

.login-layout {
  display: flex;
  height: 100%;

  .left-layout {
    box-sizing: border-box;
    flex: 500px 0 0;
  }

  .right-layout {
    flex: 1;
  }

  .left-layout {
    width: 500px;
    position: relative;
    background-color: #2f1f62;
    padding: 77px 80px;

    h1,
    h2,
    h3 {
      margin: 0;
    }

    h1 {
      margin-top: 61px;
      font-size: 32px;
      line-height: 42px;
      color: #fff
    }

    h2 {
      line-height: 42px;
      font-size: 32px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }

    h3 {
      margin-top: 8px;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: 0px;
      color: #ffffff;
    }

    .inset-layout {
      position: absolute;
      left: 0;
      width: 550px;
      height: 343px;
      bottom: 0;
    }
  }

  .right-layout {
    display: flex;
    padding: 60px 50px;
    flex-direction: column;

    .i18n-layout {
      display: flex;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 19px;
      letter-spacing: 1px;
      color: #909399;
      justify-content: flex-end;

      > * {
        &:nth-child(n+2) {
          margin-left: 5px;
        }
      }

      .i18n-item {
        cursor: pointer;
        &.active {
          color: #606266;
        }
      }
    }

    .form-layout {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        width: 350px;
        margin: 0;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 25px;
        letter-spacing: 0px;
        color: #303133;
        margin-bottom: 20px;
      }

      form {
        width: 350px;

        ::ng-deep {
          .ant-form-item {
            margin-bottom: 13px;
          }
        }

        .login-form-button {
          width: 238px;
          height: 40px;
        }
      }
    }

    .licence-layout {
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 13px;
      letter-spacing: 0px;
      color: #909399;
    }
  }

  .login-btn {
    width: 238px;
  }

  .forgot-pass-item {
    margin-bottom: 32px;

    /deep/ .el-form-item__content {
      line-height: initial;

      .el-button--text {
        padding: 0;
      }
    }
  }
}

</style>
