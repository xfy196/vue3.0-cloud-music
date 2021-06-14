import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const MiniPlayerStyled = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    width: 100%;
    height: 60px;
    background: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon,.text,.control{
        display: flex;
        align-items: center;
    }
    .icon {
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;
        box-sizing: content-box;
        .miniPlayerImg{
            &.play{
                animation : rotate 10s infinite;
            }
            &.pause{
                animation-play-state: paused
            }
        }
    }
    .text {
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        display: flex;
        overflow: hidden;
        .name {
            margin-bottom: 0.02rem;
            font-size: 0.12rem;
        }
        .desc{
            width: 100%;
            font-size: 0.12rem;
            color: #bba8a8;
            ${globalStyle["noWrap"]};
        }
    }
    .control{
        margin: 0 0.1rem;
    }
@keyframes rotate {
    0%{
        transform: rotate(0),
    }
    100% {
        transform: rotate(360deg)
    }
}

`