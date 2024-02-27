function useSession() {
  const session = localStorage.getItem("session");

  if (session) {
    const parsedSession = JSON.parse(session);
    return parsedSession;
  } else {
    return null;
  }
}

export default useSession;
