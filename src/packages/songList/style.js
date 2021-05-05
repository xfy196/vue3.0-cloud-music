import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const SongListContainer = styled.div`
flex: 1;
background: #fff;
display: flex;
flex-direction: column;
border-top-left-radius: 0.1rem;
border-top-right-radius: 0.1rem;
overflow: hidden;
.header{
    display: flex;
    box-sizing: border-box;
    margin-left: .1rem;
    position: relative;
    justify-content: space-between;
    align-items: center;
    .play_all{
        display: flex;
        align-items: center;
        height: 0.44rem;
        line-height: 0.44rem;
        .play{
            font-size: 0.24rem;
            margin-right: .1rem;
        }
        span {
            font-size: 0.16rem;
            display: flex;
            align-items: center;
            .sum {
                font-size: 0.12rem;
                color: #bba8a8;
                margin-left: 0.05rem;
            }
        }
    }
}
.songList{
    flex: 1;
    align-items: center;
    
    .songItem {
        display: flex;
        align-items: center;
        height: 0.6rem;
        .index{
        display: block;
        font-size: .16rem;
        flex-basis: .6rem;
        width: .60rem;
        height: .60rem;
        line-height: .60rem;
        text-align: center;
    }
        .songBox{
            width: calc(100% - 0.6rem);
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .name {
                ${globalStyle["noWrap"]};
                font-size: .16rem;
                color: #2E3030;
            }
            .al {
                ${globalStyle["noWrap"]};
                font-size: .12rem;
                color: #bba8a8;
            }
        }
    }
}
`