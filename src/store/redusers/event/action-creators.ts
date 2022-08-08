import axios from "axios";
import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/User";
import { EventActionEnum, SetEventAction, SetGuestAction } from "./type";

export const EventActionCreators = {
   setGuest: (payload: IUser[]): SetGuestAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
   setEvent: (payload: IEvent[]): SetEventAction => ({ type: EventActionEnum.SET_EVENTS, payload }),
   fetchGuests: () => async (dispatch: AppDispatch) => {
      try {
         const quests = await axios.get('./users.json')
         dispatch(EventActionCreators.setGuest(quests.data))
      } catch (e) {
         console.log(e)
      }
   },
   createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
      try {
         const events = localStorage.getItem("events") || '[]'
         const json = JSON.parse(events) as IEvent[]
         json.push(event)
         dispatch(EventActionCreators.setEvent(json))
         localStorage.setItem("events", JSON.stringify(json))
      } catch (e) {
         console.log(e)
      }
   },
   fetchEvents: (userName: string) => async (dispatch: AppDispatch) => {
      try {
         const events = localStorage.getItem("events") || '[]'
         const json = JSON.parse(events) as IEvent[]
         const currentUserEvents = json.filter(ev => ev.author === userName || ev.quest === userName)
         dispatch(EventActionCreators.setEvent(currentUserEvents))
      } catch (e) {
         console.log(e)
      }
   }
}