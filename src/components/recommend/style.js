import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const RecommendWrapper = styled.div `
position: relative;
.swipeContainer{
    border-radius: 0.06rem;
    width: 3.67rem;
    height: 1.6rem;
    margin: 0 auto;
    .van-swipe__indicator{
        width: .08rem;
        height: .08rem;
    }
    img{
        border-radius: 0.06rem;
    }
}
`
export const BeforeStyle = styled.div `
position: absolute;
width: 100%;
top: -3rem;
left: 0;
width: 100%;
height: 4rem;
background: ${globalStyle["theme-color"]};
`