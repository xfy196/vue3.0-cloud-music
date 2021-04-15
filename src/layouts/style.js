import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const HomeLayoutsWrapper = styled.div `
    display: flex;
    flex-direction: column;
    height: 100%;
`
export const Top = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${globalStyle["theme-color"]};
    padding: .05rem .1rem;
    z-index: 2;
    box-sizing: border-box;
    .iconfont{
        line-height: .4rem;
        color: #f1f1f1;
        font-size: 0.25rem;
    }
    .title {
        line-height: .4rem;
        color: #f1f1f1;
        font-size: .2rem;
    }
`
export const HomeLayoutContentWrapper = styled.div `
position: relative;
flex: 1;
display: flex;
height: calc(100% - 0.5rem);
flex-direction: column;
.tabs{
    display: flex;
    height: 100%;
    flex-direction: column;
    .van-tabs__line{
        width: .32rem;
        bottom: .22rem;
    }
    .van-tabs__wrap{
        position: relative;
        z-index: 10;
    }
    .van-tabs__content{
        height: calc(100% - .44rem);
        flex: 1;
        .van-tab__pane{
            height: 100%;
        }
    }
}

`