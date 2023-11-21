import axios from 'axios';

const client_id = '9f6gy9d28792qang0hxswp3gw6hexi';
const client_secret = '5y7yapttxqz93341sp70tkfbeijutr';
const tokenEndpoint = 'https://id.twitch.tv/oauth2/token';
const igdbEndpoint = 'https://api.igdb.com/v4/games';

const GameDetails = () => {

  useEffect(() => {
    console.log(id);
    const fetchGameDetails = async () => {
      try {
        const gameDocRef = doc(firestore, 'games', id);
        const gameDoc = await getDoc(gameDocRef);
        if (gameDoc.exists()) {
          setGame(gameDoc.data());
        } else {
          console.log('Game not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found.</div>;
  }

  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <p>{game.content}</p>
    </div>
  );
};

export default GameDetails;
