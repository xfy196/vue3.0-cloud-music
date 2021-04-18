import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const SingersContainer = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.05rem 0.05rem;
    .cateScroll{
        display: flex;
        white-space: nowrap;
        align-items: center;
        .title {
            display: block;
            padding: .05rem 0;
            color: grey;
            font-size: .14rem;
            vertical-align: middle;
        }
        li {
            flex: 0 0 auto;
            font-size: .14rem;
            span{
                padding: 0.05rem 0.05rem;
                border-radius: .1rem;
                &.active{
                    border: 1px solid ${globalStyle["theme-color"]};
                    color: ${globalStyle["theme-color"]};
                    opacity: 0.8;
                }
                &::before{
                    border: none;
                }
            }
        }
    }
    .hotTypeScroll{
        width: ${(props) => props.hotTypeScrollWidth === 0 ? "auto" : `${props.hotTypeScrollWidth}px`};
    }
    .alphaTypeScroll{
        width: ${(props) => props.alphaTypeScrollWidth === 0 ? "auto" : `${props.alphaTypeScrollWidth}px`};

    }
`