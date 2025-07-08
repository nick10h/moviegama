import { searchMovies, searchMovieByTitle, getMovieDetails } from './movieService';

// Movie database for dialogue and scene matching
const movieDatabase = {
  dialogues: {
    "i'll make him an offer he can't refuse": ["The Godfather"],
    "here's johnny": ["The Shining"],
    "you can't handle the truth": ["A Few Good Men"],
    "i'm gonna make him an offer he can't refuse": ["The Godfather"],
    "elementary my dear watson": ["Sherlock Holmes"],
    "bond james bond": ["James Bond"],
    "i'm king of the world": ["Titanic"],
    "after all tomorrow is another day": ["Gone with the Wind"],
    "there's no place like home": ["The Wizard of Oz"],
    "i'm not a smart man but i know what love is": ["Forrest Gump"],
    "you had me at hello": ["Jerry Maguire"],
    "to infinity and beyond": ["Toy Story"],
    "just keep swimming": ["Finding Nemo"],
    "hakuna matata": ["The Lion King"],
    "may the force be with you": ["Star Wars", "Star Wars: The Empire Strikes Back"],
    "i'll be back": ["The Terminator", "Terminator 2: Judgment Day"],
    "here's looking at you kid": ["Casablanca"],
    "you talking to me": ["Taxi Driver"],
    "frankly my dear i don't give a damn": ["Gone with the Wind"],
    "show me the money": ["Jerry Maguire"],
    "i see dead people": ["The Sixth Sense"],
    "houston we have a problem": ["Apollo 13"],
    "nobody puts baby in a corner": ["Dirty Dancing"],
    "life is like a box of chocolates": ["Forrest Gump"],
    "why so serious": ["The Dark Knight"],
    "i am your father": ["Star Wars: The Empire Strikes Back"],
    "keep your friends close but your enemies closer": ["The Godfather Part II"],
    "say hello to my little friend": ["Scarface"],
    "i feel the need for speed": ["Top Gun"]
  },
  
  scenes: {
    "final battle": ["Avengers: Endgame", "Lord of the Rings: The Return of the King", "Star Wars: Return of the Jedi"],
    "training montage": ["Rocky", "The Karate Kid", "Batman Begins"],
    "wedding scene": ["The Princess Bride", "My Big Fat Greek Wedding", "Four Weddings and a Funeral"],
    "courtroom drama": ["12 Angry Men", "To Kill a Mockingbird", "A Few Good Men"],
    "space battle": ["Star Wars", "Guardians of the Galaxy", "Star Trek Into Darkness"],
    "underwater scene": ["Aquaman", "The Little Mermaid", "Finding Nemo"],
    "desert scene": ["Lawrence of Arabia", "Mad Max: Fury Road", "Dune"],
    "snow scene": ["Frozen", "The Shining", "Fargo"],
    "spaceship battle": ["Star Wars", "Guardians of the Galaxy", "Star Trek"],
    "car chase": ["Fast and Furious", "Baby Driver", "Mad Max: Fury Road"],
    "bank robbery": ["Heat", "The Dark Knight", "Point Break"],
    "prison escape": ["The Shawshank Redemption", "Escape from Alcatraz", "The Great Escape"],
    "dance scene": ["La La Land", "Dirty Dancing", "Pulp Fiction"],
    "sword fight": ["The Princess Bride", "Kill Bill", "Pirates of the Caribbean"],
    "time travel": ["Back to the Future", "Groundhog Day", "Looper"],
    "alien invasion": ["Independence Day", "War of the Worlds", "District 9"],
    "zombie apocalypse": ["Dawn of the Dead", "28 Days Later", "World War Z"],
    "heist": ["Ocean's Eleven", "The Italian Job", "Now You See Me"]
  },
  
  genres: {
    "superhero": ["The Avengers", "The Dark Knight", "Spider-Man: Into the Spider-Verse"],
    "western": ["The Good, the Bad and the Ugly", "Unforgiven", "True Grit"],
    "musical": ["La La Land", "The Greatest Showman", "Mamma Mia!"],
    "war": ["Saving Private Ryan", "Apocalypse Now", "Full Metal Jacket"],
    "crime": ["Goodfellas", "The Departed", "Pulp Fiction"],
    "mystery": ["The Prestige", "Zodiac", "Knives Out"],
    "biography": ["The Social Network", "Bohemian Rhapsody", "Gandhi"],
    "family": ["The Incredibles", "Finding Nemo", "Shrek"],
    "action": ["Die Hard", "Mad Max: Fury Road", "John Wick"],
    "comedy": ["The Hangover", "Superbad", "Anchorman"],
    "horror": ["The Exorcist", "Halloween", "A Quiet Place"],
    "romance": ["The Notebook", "Titanic", "When Harry Met Sally"],
    "sci-fi": ["Blade Runner", "The Matrix", "Interstellar"],
    "thriller": ["Se7en", "Gone Girl", "Shutter Island"],
    "drama": ["The Godfather", "Schindler's List", "12 Years a Slave"],
    "fantasy": ["Lord of the Rings", "Harry Potter", "Pan's Labyrinth"],
    "animation": ["Toy Story", "Spirited Away", "The Lion King"],
    "documentary": ["Free Solo", "Won't You Be My Neighbor?", "March of the Penguins"]
  }
};

export const analyzeUserInput = async (input) => {
  const lowerInput = input.toLowerCase().trim();
  
  // Enhanced dialogue matching with partial matches
  for (const [dialogue, movies] of Object.entries(movieDatabase.dialogues)) {
    const dialogueWords = dialogue.split(' ');
    const inputWords = lowerInput.split(' ');
    
    // Check for exact match
    if (lowerInput.includes(dialogue)) {
      return {
        type: 'dialogue',
        matches: movies,
        confidence: 'high',
        explanation: `I recognized that iconic quote! "${dialogue}" is from:`
      };
    }
    
    // Check for partial match (at least 60% of words match)
    const matchingWords = dialogueWords.filter(word => 
      inputWords.some(inputWord => inputWord.includes(word) || word.includes(inputWord))
    );
    
    if (matchingWords.length >= Math.ceil(dialogueWords.length * 0.6)) {
      return {
        type: 'dialogue',
        matches: movies,
        confidence: 'medium',
        explanation: `That sounds like a quote from these movies:`
      };
    }
  }
  
  // Check for dialogues
  
  // Check for scenes
  for (const [scene, movies] of Object.entries(movieDatabase.scenes)) {
    if (lowerInput.includes(scene)) {
      return {
        type: 'scene',
        matches: movies,
        confidence: 'high',
        explanation: `Great choice! Here are some movies with amazing ${scene} scenes:`
      };
    }
  }
  
  // Check for genres
  for (const [genre, movies] of Object.entries(movieDatabase.genres)) {
    if (lowerInput.includes(genre)) {
      return {
        type: 'genre',
        matches: movies,
        confidence: 'medium',
        explanation: `Here are some excellent ${genre} movies I'd recommend:`
      };
    }
  }
  
  // Check for mood/feeling descriptors
  if (lowerInput.includes('romantic') || lowerInput.includes('love') || lowerInput.includes('date night')) {
    return {
      type: 'mood',
      matches: ['The Notebook', 'Casablanca', 'When Harry Met Sally'],
      confidence: 'medium',
      explanation: `Perfect for a romantic evening:`
    };
  }
  
  if (lowerInput.includes('adventure') || lowerInput.includes('exciting') || lowerInput.includes('thrilling')) {
    return {
      type: 'mood',
      matches: ['Indiana Jones', 'Pirates of the Caribbean', 'The Mummy'],
      confidence: 'medium',
      explanation: `Ready for an adventure? Try these exciting films:`
    };
  }
  
  if (lowerInput.includes('family') || lowerInput.includes('kids') || lowerInput.includes('children')) {
    return {
      type: 'mood',
      matches: ['The Incredibles', 'Finding Nemo', 'Toy Story'],
      confidence: 'medium',
      explanation: `Great for family movie night:`
    };
  }
  
  if (lowerInput.includes('classic') || lowerInput.includes('old') || lowerInput.includes('vintage')) {
    return {
      type: 'mood',
      matches: ['Casablanca', 'Gone with the Wind', 'Citizen Kane'],
      confidence: 'medium',
      explanation: `Here are some timeless classics:`
    };
  }
  
  if (lowerInput.includes('sad') || lowerInput.includes('cry') || lowerInput.includes('emotional')) {
    return {
      type: 'mood',
      matches: ['The Pursuit of Happyness', 'Marley & Me', 'Inside Out'],
      confidence: 'medium',
      explanation: `For an emotional experience, try these tear-jerkers:`
    };
  }
  
  if (lowerInput.includes('funny') || lowerInput.includes('laugh') || lowerInput.includes('comedy')) {
    return {
      type: 'mood',
      matches: ['The Grand Budapest Hotel', 'Superbad', 'Anchorman'],
      confidence: 'medium',
      explanation: `Need a good laugh? These comedies will do the trick:`
    };
  }
  
  if (lowerInput.includes('scary') || lowerInput.includes('horror') || lowerInput.includes('frightening')) {
    return {
      type: 'mood',
      matches: ['Hereditary', 'The Conjuring', 'Get Out'],
      confidence: 'medium',
      explanation: `Ready to be scared? These horror films will keep you on edge:`
    };
  }
  
  // If no specific patterns match, treat as movie title search
  return {
    type: 'search',
    query: input,
    confidence: 'low',
    explanation: `I'll search for movies related to "${input}" for you:`
  };
};

export const generateMovieRecommendations = async (userInput) => {
  const analysis = await analyzeUserInput(userInput);
  let recommendations = [];
  
  if (analysis.type === 'search') {
    // Search for movies using the API
    const searchResults = await searchMovies(analysis.query);
    
    if (searchResults.length > 0) {
      // Get detailed info for top 3 results
      const detailedMovies = await Promise.all(
        searchResults.slice(0, 3).map(movie => getMovieDetails(movie.imdbID))
      );
      recommendations = detailedMovies.filter(movie => movie !== null);
    } else {
      // If no direct matches, try searching for individual words
      const words = analysis.query.split(' ');
      for (const word of words) {
        if (word.length > 3) {
          const results = await searchMovies(word);
          if (results.length > 0) {
            const movie = await getMovieDetails(results[0].imdbID);
            if (movie) recommendations.push(movie);
            break;
          }
        }
      }
    }
  } else {
    // Use predefined matches
    const moviePromises = analysis.matches.slice(0, 3).map(async (title) => {
      const movie = await searchMovieByTitle(title);
      return movie;
    });
    
    const movies = await Promise.all(moviePromises);
    recommendations = movies.filter(movie => movie !== null);
  }
  
  return {
    analysis,
    recommendations: recommendations.slice(0, 3) // Limit to 3 recommendations
  };
};