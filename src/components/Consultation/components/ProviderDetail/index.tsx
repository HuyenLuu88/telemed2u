import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@twilio/conversations';
import { Conversation } from '@twilio/conversations/lib/conversation';
import { Message } from '@twilio/conversations/lib/message';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { WaitingQueue, CurrentUserData } from '../../apis/createWaitingQueue'
type ProviderDetailContextType = {
    isAccessAdmit: boolean;
    participantType: string;
    setAccessAdmit: (isAccessAdmit: boolean) => void;
    setParticipant: (participantType: string) => void;
    socket: any;
    currentUser: CurrentUserData | null;
    setCurrentUser: (currentUser: CurrentUserData | null) => void;
    waitingCount: number;
    setCountWaitingUser: (waitingCount: number) => void;
    listWaiting: any;
    setListWaiting: (listWaiting: any) => void;
    appointmentInfo: any;
    setAppointmentInfo: (appointmentInfo: any) => void;
    upcoming:any;
    setupcoming: (upcoming: any) => void;

};

export const ProviderDetailContext = createContext<ProviderDetailContextType>(null!);
//@ts-ignore
export const ProviderDetail: React.FC = ({ socket, children }) => {

    const [isAccessAdmit, setAccessAdmit] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUserData | null>(null)
    const [waitingCount, setCountWaitingUser] = useState<number>(0);
    const [listWaiting, setListWaiting] = useState<Array<WaitingQueue> | []>([]);
    const [appointmentInfo, setAppointmentInfo] = useState<any>({});
    const [participantType, setParticipant] = useState('');
    const [upcoming, setupcoming] = useState<any>();
    return (
        <ProviderDetailContext.Provider
            value={{
                isAccessAdmit,
                participantType,
                setAccessAdmit,
                setParticipant,
                socket,
                currentUser,
                setCurrentUser,
                waitingCount,
                setCountWaitingUser,
                listWaiting,
                setListWaiting,
                appointmentInfo,
                setAppointmentInfo,
                setupcoming,
                upcoming
            }}
        >
            {children}
        </ProviderDetailContext.Provider>
    );
};
