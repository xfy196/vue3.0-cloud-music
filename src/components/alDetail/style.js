import styled from "vue3-styled-components"
export const SongListStyled = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 bottom: 0;
 right: 0;   
 background: #ffffff;
 width: 100%;
 height: 100%;
 overflow-y: auto;
 /* overflow-x: hidden; */
 .detailContainer{
     width: 100%;
     height: 100%;
     .detailBackgroundWrapper{
         background-size: 100%;
         padding: 0.05rem 0.2rem;
         display: flex;
         padding-bottom: 0.5rem;
         margin-bottom: 0.2rem;
         align-items: center;
         box-sizing: border-box;
         width: 100%;
         height:2.75rem;
         position: relative;
         .background {
             background: url(${(props) => props.coverImgUrl}) left top no-repeat;
             background-position: 0 0;
             background-size: 100% 100%;
             position: absolute;
             left: 0;
             top: 0;
             width: 100%;
             height: 100%;
             z-index: -1;
             filter: blur(0.2rem)
         }
         .img_wrapper {
             position: relative;
             .image{
                 border-radius: 0.03rem;
                 overflow: hidden;
             }
            .decorate{
                position: absolute;
                top: 0;
                width: 100%;
                height: .35rem;
                border-radius: .03rem;
                background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
            } 
            .play_count {
                position: absolute;
                top: 0.02rem;
                right: 0.02rem;
                color: #f1f1f1;
                font-size: 0.12rem;
                line-height: 0.15rem;
                .count {
                    vertical-align: top;
                }
            }
         }
         .desc_wrapper{
             display: flex;
             flex-direction: column;
             justify-content: space-evenly;
             padding: 0 0.1rem;
             height: 1.2rem;
             flex: 1;
            .title {
                max-height: .7rem;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #f1f1f1;
                font-weight: 700;
                line-height: 1.5;
                font-size: .16rem;
            }
            .person {
                display: flex;
                align-items: center;
                .name {
                    line-height: .2rem;
                    font-size: .14rem;
                    color: #bba8a8;
                    margin-left: 0.1rem;
                }
            }
         }
     }
 }
`
export const Menu = styled.div`
    position: relative;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .30rem .20rem .30rem;
    margin: -1rem 0 0 0;
    div{
        display: flex;
        flex-direction: column;
        line-height: .20rem;
        text-align: center;
        font-size: .12rem;
        color: #3b1f1f;
        color: #f1f1f1;
        z-index: 1000;
    }
`