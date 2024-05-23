import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { useRef } from "react";
import { Message } from "../data/messages";
import "./MessageListItem.css";

interface MessageListItemProps {
  message: Message & { displayDate: string };
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const button = useRef<HTMLIonButtonElement>(null);

  return (
    <>
      <IonItem>
        <IonLabel class='flex-row'>
          <div
            style={{
              width: "100%",
              display: "flex",
              position: "relative",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              src={message.small_image}
              alt={message.hash}
              style={{ width: "100%", height: "auto" }}
              onClick={() => button.current?.click()}
            />
            <IonNote
              style={{
                position: "absolute",
                right: "5px",
                bottom: "5px",
                textShadow: "0 0 4px black, 0 0 2px black",
                color: "white",
              }}
            >
              {message.displayDate}
            </IonNote>
          </div>
          <IonButton
            ref={button}
            id={message.hash}
            style={{ display: "none" }}
          />
        </IonLabel>
      </IonItem>
      <IonModal ref={modal} trigger={message.hash}>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot='start'>
                <IonButton onClick={() => modal.current?.dismiss()}>
                  back
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonRow className='ion-justify-content-center'>
            <div>
              <img
                src={message.full_image}
                alt={message.hash}
                style={{
                  width: "100%",
                  height: "auto",
                  // maxHeight: "78vh",
                }}
              />
            </div>
          </IonRow>
        </IonContent>
      </IonModal>
    </>
  );
};

export default MessageListItem;
