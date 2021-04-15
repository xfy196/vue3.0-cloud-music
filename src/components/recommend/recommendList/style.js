import styled from "vue3-styled-components"
export const RecommendListStyled = styled.div `

`
export const ListStyled = styled.div `
.listItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 .03rem;
    .img_wrapper{
        position: relative;
        height: 0;
        padding-bottom: 100%;
        width: 100%;
        .decorate{
            z-index: 1;
            position: absolute;
            top: 0;
            width: 100%;
            height: .35rem;
            border-radius: .03rem;
            background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 0.03rem;
        }
        .play_count{
            position: absolute;
            right: 0.02rem;
            top: 0.02rem;
            z-index: 1;
            line-height: 0.15rem;
            color: #f1f1f1;
            font-size: .12rem;
        }
    }
    .desc {
        overflow: hidden;
    margin-top: .02rem;
    padding: 0 .02rem;
    height: .5rem;
    text-align: left;
    font-size: .12rem;
    line-height: 1.4;
    color: #2E3030;
    }
}
`