import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import MessageListItem from "../components/MessageListItem";
import { type Message } from "../data/messages";
import { prettyDate } from "../util/date";
import "./Home.css";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const readMessages = async () => {
    const options = {
      url: "https://z-storage-glovbogi2a-uc.a.run.app/cats/read",
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    const messages = response.data as Message[];
    return messages.map((m) => ({
      ...m,
      displayDate: prettyDate(m.creation_timestamp),
    }));
  };

  useIonViewWillEnter(() => {
    readMessages().then(setMessages);
  });

  const refresh = async (e: CustomEvent) => {
    const values = await readMessages();
    setMessages(values);
    e.detail.complete();
  };

  return (
    <IonPage id='home-page'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Are My Cats Alive?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot='fixed' onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle>Are My Cats Alive?</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {messages.map((m) => (
            <MessageListItem message={m} key={m.hash} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
