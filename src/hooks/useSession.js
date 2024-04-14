function useSession() {
  const session = document.cookie;

  if (session) {
    const parsedSession = JSON.parse(session.split("=")[1]);
    return parsedSession;
  } else {
    return null;
  }
}

export default useSession;
