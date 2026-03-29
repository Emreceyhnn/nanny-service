import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { useAuth } from "../hooks/useAuth";

export interface UserAppointment {
  id: string;
  nannyId: string;
  nannyName: string;
  nannyAvatar: string;
  userId: string;
  address: string;
  time: string;
  age: number;
  createdAt: number;
  name: string;
  comment?: string;
}

export const useUserAppointments = () => {
  const {
    state: { user },
  } = useAuth();
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      Promise.resolve().then(() => {
        setAppointments([]);
        setIsLoading(false);
      });
      return;
    }

    const appointmentsRef = ref(db, "appointments");
    const userQuery = query(
      appointmentsRef,
      orderByChild("userId"),
      equalTo(user.uid),
    );

    const unsubscribe = onValue(userQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...(value as Omit<UserAppointment, "id">),
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
        setAppointments(list);
      } else {
        setAppointments([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { appointments, isLoading };
};
