import React from "react"
import IWizAnnouncement from "../interfaces/WizAnnouncement"
import ANNOUNCEMENT_MAP from "../text_map/AnnouncementMap"
import { WizAnnouncementType } from "../interfaces/WizAnnouncementType"
import IWizPlayer from "../interfaces/WizPlayer"
import ClubSession from "../../utils/ClubSession"

interface IAnnouncementProps {
    announcement: IWizAnnouncement
    players: IWizPlayer[]
}
interface IAnnouncementState {
    show: boolean
    previousVersion: number
}
const Announcement: React.FC<IAnnouncementProps> = (props) => {
    const [show, setShow] = React.useState(false)
    const [previousVersion, setPreviousVersion] = React.useState(0)
    
    const displayAnnouncement = (time: number) => {
        setShow(true)
        setTimeout(() => { 
            setShow(false)
         }, time)
    }

    React.useEffect(() => {
        if (
            props.announcement.player !== ClubSession.getPlayerId() &&
            props.announcement &&
            props.announcement.type !== WizAnnouncementType.NONE &&
            props.announcement.version > previousVersion
        ) { 
            displayAnnouncement(3000)
        }
    }, [props.announcement])
    
    const text = getText(props.announcement, props.players)
    let classes = "grey-popup" 
    classes += show ? " show" : ""
    
    return (
        <span className={classes}>
            {text}
        </span>
    )
}
const getText = (
    announcement: IWizAnnouncement, 
    players: IWizPlayer[]
) : string => {

    let text: string = ""
    const type = announcement.type
    const player = players.find((player) => {
        return player.id === announcement.player
    })
    if (player) {
        switch (type) {
            case WizAnnouncementType.PLACED_BET:
                text = ANNOUNCEMENT_MAP[WizAnnouncementType.PLACED_BET](
                    player.name,
                    player.bet
                )
                break
            case WizAnnouncementType.PLAYED_CARD:
                text = ANNOUNCEMENT_MAP[WizAnnouncementType.PLAYED_CARD](
                    player.name
                )
                break
            case WizAnnouncementType.WON_TAKE:
                text = ANNOUNCEMENT_MAP[WizAnnouncementType.WON_TAKE](
                    player.name
                )
                break
            case WizAnnouncementType.WON_GAME:
                text = ANNOUNCEMENT_MAP[WizAnnouncementType.WON_GAME](
                    player.name
                )
                break
            default:
                break
        }
    }

    return text
}
export default Announcement