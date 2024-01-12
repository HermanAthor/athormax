// "use client";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase-config";
// import { useState, useEffect } from "react";

// const useCurrentUser = async () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const getUser = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         setLoading(false);
//       }
//     });
//     return getUser();
//   }, [user]);
//   return { user, loading };
// };
// export default useCurrentUser;

// NOT USING THE ABOVE FUNCTION ANYWHERE

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => getUser();
  }, []);

  return { user, loading };
};

export default useCurrentUser;
