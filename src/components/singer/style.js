import styled from "vue3-styled-components"
export const SingerContainer = styled.div`
    position: fixed;
    background-color: #f2f3f4;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-bottom: ${(props) => props.playSwitch ? '0.6rem' : 0};
    .headerTop {
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        height: 0.44rem;
        line-height: 0.44rem;
        width: 100%;
        z-index: 100;
        padding: 0.05rem 0.1rem;
        color: #f1f1f1;
        .singerName{
            font-size: 0.16rem;
            font-weight: 700;
            margin: 0;
            margin-left: 0.05rem;
        }
    }
    .songsContainer{
        overflow: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        margin-bottom: ${(props) =>  props.playSwitch ? '0.6rem' : '0'};
        .songsWrapper{
            background-color: #fff;
            position: absolute;
            width: 100%;
            border-radius: 0.1rem;
        }
    }
`

export const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-image: url(${(props) => props.background});
    background-size: cover;
    z-index: 50;
    .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7,17,27,0.3);
    }
`
export const CollectionButton = styled.div`
    button{
        position: fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
        box-sizing: border-box;
        width: 1.2rem;
        height: 0.4rem;
        z-index: 50;
        color: #f1f1f1;
        line-height: 0.4rem;
        margin-top: -0.55rem;
    }
`