// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from 'react';
// import { getProfile, logout as apiLogout } from '../utilitis/api_request';

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser]     = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // حاول تجيب بروفايل تلقائياً لو في توكن
//     getProfile()
//       .then(profile => setUser(profile))
//       .catch(() => {
//         apiLogout();   // يمسح التوكن لو انتهت صلاحيته
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const logout = () => {
//     setUser(null);
//     apiLogout();
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
