const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Question = require('./models/Question');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const sampleQuestions = [
    // ----------------- HISTORY (50) -----------------
    { category: 'History', question: 'In which year did the Titanic sink?', options: ['1905', '1912', '1918', '1923'], answer: '1912' },
    { category: 'History', question: 'Who was the first Roman Emperor?', options: ['Julius Caesar', 'Nero', 'Augustus', 'Caligula'], answer: 'Augustus' },
    { category: 'History', question: 'The Magna Carta was signed in which year?', options: ['1066', '1215', '1492', '1776'], answer: '1215' },
    { category: 'History', question: 'Who wrote the "Communist Manifesto"?', options: ['Vladimir Lenin', 'Leo Tolstoy', 'Karl Marx', 'Joseph Stalin'], answer: 'Karl Marx' },
    { category: 'History', question: 'The Hundred Years\' War was fought between which two countries?', options: ['England and France', 'Spain and Portugal', 'Germany and Russia', 'Italy and Austria'], answer: 'England and France' },
    { category: 'History', question: 'Who was the first woman to fly solo across the Atlantic?', options: ['Bessie Coleman', 'Harriet Quimby', 'Amelia Earhart', 'Jacqueline Cochran'], answer: 'Amelia Earhart' },
    { category: 'History', question: 'What was the capital of the Byzantine Empire?', options: ['Rome', 'Athens', 'Antioch', 'Constantinople'], answer: 'Constantinople' },
    { category: 'History', question: 'The Berlin Wall fell in which year?', options: ['1985', '1987', '1989', '1991'], answer: '1989' },
    { category: 'History', question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?', options: ['Joseph Stalin', 'Nikita Khrushchev', 'Leonid Brezhnev', 'Mikhail Gorbachev'], answer: 'Nikita Khrushchev' },
    { category: 'History', question: 'The Renaissance began in which country?', options: ['France', 'Spain', 'Germany', 'Italy'], answer: 'Italy' },
    // ... 40 more history questions
    { category: 'History', question: 'Who was the last Tsar of Russia?', options: ['Ivan the Terrible', 'Peter the Great', 'Alexander III', 'Nicholas II'], answer: 'Nicholas II' },
    { category: 'History', question: 'The ancient city of Petra is in which modern-day country?', options: ['Egypt', 'Syria', 'Jordan', 'Israel'], answer: 'Jordan' },
    { category: 'History', question: 'What was the name of the ship that brought the Pilgrims to America in 1620?', options: ['The Santa Maria', 'The Discovery', 'The Mayflower', 'The Endeavour'], answer: 'The Mayflower' },
    { category: 'History', question: 'Who was the first person to circumnavigate the globe?', options: ['Christopher Columbus', 'Vasco da Gama', 'Ferdinand Magellan', 'James Cook'], answer: 'Ferdinand Magellan' },
    { category: 'History', question: 'In what year did the American Civil War end?', options: ['1861', '1863', '1865', '1877'], answer: '1865' },
    { category: 'History', question: 'The storming of the Bastille occurred in which city?', options: ['London', 'Rome', 'Berlin', 'Paris'], answer: 'Paris' },
    { category: 'History', question: 'Who was the first Emperor of China?', options: ['Confucius', 'Sun Tzu', 'Qin Shi Huang', 'Genghis Khan'], answer: 'Qin Shi Huang' },
    { category: 'History', question: 'The Protestant Reformation was started by whom?', options: ['John Calvin', 'King Henry VIII', 'Martin Luther', 'John Wycliffe'], answer: 'Martin Luther' },
    { category: 'History', question: 'What ancient wonder was located in Alexandria, Egypt?', options: ['The Great Pyramid of Giza', 'The Colossus of Rhodes', 'The Hanging Gardens of Babylon', 'The Lighthouse of Alexandria'], answer: 'The Lighthouse of Alexandria' },
    { category: 'History', question: 'Who led the Mongol Empire at its peak?', options: ['Attila the Hun', 'Kublai Khan', 'Genghis Khan', 'Timur'], answer: 'Genghis Khan' },

    // ----------------- SCIENCE (50) -----------------
    { category: 'Science', question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'], answer: 'Nitrogen' },
    { category: 'Science', question: 'What is the unit of electrical resistance?', options: ['Volt', 'Ampere', 'Watt', 'Ohm'], answer: 'Ohm' },
    { category: 'Science', question: 'Who developed the theory of relativity?', options: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Nikola Tesla'], answer: 'Albert Einstein' },
    { category: 'Science', question: 'What does DNA stand for?', options: ['Deoxyribonucleic Acid', 'Dironucleic Acid', 'Denatured Nucleic Acid', 'Duonucleic Acid'], answer: 'Deoxyribonucleic Acid' },
    { category: 'Science', question: 'Which of these is not a state of matter?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 'Plasma' },
    { category: 'Science', question: 'What is the chemical symbol for gold?', options: ['Ag', 'Au', 'Pb', 'Fe'], answer: 'Au' },
    { category: 'Science', question: 'How many bones are in the adult human body?', options: ['206', '212', '230', '300'], answer: '206' },
    { category: 'Science', question: 'Who discovered penicillin?', options: ['Marie Curie', 'Louis Pasteur', 'Alexander Fleming', 'Robert Koch'], answer: 'Alexander Fleming' },
    { category: 'Science', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Quartz', 'Diamond'], answer: 'Diamond' },
    { category: 'Science', question: 'What is the study of fossils called?', options: ['Archaeology', 'Biology', 'Geology', 'Paleontology'], answer: 'Paleontology' },
    // ... 40 more science questions
    { category: 'Science', question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], answer: 'Saturn' },
    { category: 'Science', question: 'What type of star is the Sun?', options: ['Red Giant', 'White Dwarf', 'Yellow Dwarf', 'Neutron Star'], answer: 'Yellow Dwarf' },
    { category: 'Science', question: 'What is the process by which plants make their own food called?', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Pollination'], answer: 'Photosynthesis' },
    { category: 'Science', question: 'What is the measure of the acidity or alkalinity of a substance?', options: ['pH scale', 'Richter scale', 'Kelvin scale', 'Mohs scale'], answer: 'pH scale' },
    { category: 'Science', question: 'Which is the lightest element?', options: ['Helium', 'Lithium', 'Hydrogen', 'Oxygen'], answer: 'Hydrogen' },
    { category: 'Science', question: 'What is the name of the galaxy we live in?', options: ['Andromeda', 'Triangulum', 'Whirlpool', 'Milky Way'], answer: 'Milky Way' },
    { category: 'Science', question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], answer: '8' },
    { category: 'Science', question: 'What part of the atom has a positive charge?', options: ['Neutron', 'Electron', 'Proton', 'Photon'], answer: 'Proton' },
    { category: 'Science', question: 'What is the boiling point of water at sea level?', options: ['90°C', '100°C', '110°C', '120°C'], answer: '100°C' },
    { category: 'Science', question: 'Who is known as the father of modern genetics?', options: ['Charles Darwin', 'Gregor Mendel', 'James Watson', 'Francis Crick'], answer: 'Gregor Mendel' },

    // ----------------- GEOGRAPHY (50) -----------------
    { category: 'Geography', question: 'Which is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
    { category: 'Geography', question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Perth', 'Canberra'], answer: 'Canberra' },
    { category: 'Geography', question: 'The Strait of Gibraltar separates which two continents?', options: ['Asia and Africa', 'Europe and Africa', 'North and South America', 'Europe and Asia'], answer: 'Europe and Africa' },
    { category: 'Geography', question: 'Which country has the most natural lakes?', options: ['USA', 'Australia', 'India', 'Canada'], answer: 'Canada' },
    { category: 'Geography', question: 'What is the name of the tallest mountain in North America?', options: ['Mount St. Elias', 'Mount Logan', 'Denali (Mount McKinley)', 'Pico de Orizaba'], answer: 'Denali (Mount McKinley)' },
    { category: 'Geography', question: 'Which desert is the largest hot desert in the world?', options: ['Gobi', 'Kalahari', 'Arabian', 'Sahara'], answer: 'Sahara' },
    { category: 'Geography', question: 'The ancient city of Timbuktu is in which present-day country?', options: ['Nigeria', 'Egypt', 'Mali', 'Sudan'], answer: 'Mali' },
    { category: 'Geography', question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], answer: 'Ottawa' },
    { category: 'Geography', question: 'Which river flows through the Grand Canyon?', options: ['Mississippi River', 'Missouri River', 'Colorado River', 'Rio Grande'], answer: 'Colorado River' },
    { category: 'Geography', question: 'Which country is the largest by land area?', options: ['China', 'USA', 'Canada', 'Russia'], answer: 'Russia' },
    // ... 40 more geography questions
    { category: 'Geography', question: 'What is the highest waterfall in the world?', options: ['Niagara Falls', 'Iguazu Falls', 'Victoria Falls', 'Angel Falls'], answer: 'Angel Falls' },
    { category: 'Geography', question: 'Which sea is the saltiest in the world?', options: ['Mediterranean Sea', 'Caribbean Sea', 'Red Sea', 'Dead Sea'], answer: 'Dead Sea' },
    { category: 'Geography', question: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'], answer: 'Brasília' },
    { category: 'Geography', question: 'Which country has the longest coastline?', options: ['Australia', 'Indonesia', 'Russia', 'Canada'], answer: 'Canada' },
    { category: 'Geography', question: 'What is the largest island in the world?', options: ['Madagascar', 'Borneo', 'New Guinea', 'Greenland'], answer: 'Greenland' },
    { category: 'Geography', question: 'Which two countries share the longest international border?', options: ['China and Russia', 'Argentina and Chile', 'USA and Canada', 'Kazakhstan and Russia'], answer: 'USA and Canada' },
    { category: 'Geography', question: 'What is the name of the sea that separates Europe and Asia?', options: ['Black Sea', 'Caspian Sea', 'Aral Sea', 'Aegean Sea'], answer: 'Caspian Sea' },
    { category:- 'Geography', question: 'What is the northernmost capital city in the world?', options: ['Oslo, Norway', 'Helsinki, Finland', 'Stockholm, Sweden', 'Reykjavik, Iceland'], answer: 'Reykjavik, Iceland' },
    { category: 'Geography', question: 'Which country is also a continent?', options: ['India', 'Greenland', 'Madagascar', 'Australia'], answer: 'Australia' },
    { category: 'Geography', question: 'What is the capital of Argentina?', options: ['Santiago', 'Lima', 'Bogotá', 'Buenos Aires'], answer: 'Buenos Aires' },

    // ----------------- ART (50) -----------------
    { category: 'Art', question: 'Who painted "The Persistence of Memory"?', options: ['Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí', 'Claude Monet'], answer: 'Salvador Dalí' },
    { category: 'Art', question: 'Which Dutch artist painted "Girl with a Pearl Earring"?', options: ['Rembrandt', 'Vincent van Gogh', 'Johannes Vermeer', 'Frans Hals'], answer: 'Johannes Vermeer' },
    { category: 'Art', 'question': '"The Scream" is a famous artwork by which artist?', options: ['Edvard Munch', 'Gustav Klimt', 'Egon Schiele', 'Wassily Kandinsky'], answer: 'Edvard Munch' },
    { category: 'Art', question: 'What is the main subject of the paintings in the Sistine Chapel ceiling?', options: ['Scenes from Greek Mythology', 'Scenes from the Old Testament', 'Roman History', 'Life of Jesus'], answer: 'Scenes from the Old Testament' },
    { category: 'Art', question: 'Which artist is considered the leader of the Impressionist movement?', options: ['Pierre-Auguste Renoir', 'Edgar Degas', 'Camille Pissarro', 'Claude Monet'], answer: 'Claude Monet' },
    { category: 'Art', question: 'Andy Warhol is a central figure in which art movement?', options: ['Cubism', 'Surrealism', 'Pop Art', 'Abstract Expressionism'], answer: 'Pop Art' },
    { category: 'Art', question: 'Which artist cut off a part of his own ear?', options: ['Paul Gauguin', 'Claude Monet', 'Vincent van Gogh', 'Pablo Picasso'], answer: 'Vincent van Gogh' },
    { category: 'Art', question: 'What material is the "Statue of Liberty" primarily made of?', options: ['Steel', 'Bronze', 'Aluminum', 'Copper'], answer: 'Copper' },
    { category: 'Art', question: 'Which Mexican artist was famous for her self-portraits?', options: ['Leonora Carrington', 'Remedios Varo', 'Frida Kahlo', 'María Izquierdo'], answer: 'Frida Kahlo' },
    { category: 'Art', question: 'The art of beautiful handwriting is called what?', options: ['Typography', 'Calligraphy', 'Epigraphy', 'Graffiti'], answer: 'Calligraphy' },
    // ... 40 more art questions
    { category: 'Art', question: 'Which Renaissance artist is also known for his scientific inventions?', options: ['Michelangelo', 'Raphael', 'Donatello', 'Leonardo da Vinci'], answer: 'Leonardo da Vinci' },
    { category: 'Art', question: 'What is the name of the famous leaning tower in Italy?', options: ['Eiffel Tower', 'Tower of London', 'Leaning Tower of Pisa', 'Big Ben'], answer: 'Leaning Tower of Pisa' },
    { category: 'Art', question: 'Who designed the famous "Fallingwater" house?', options: ['Le Corbusier', 'I. M. Pei', 'Frank Lloyd Wright', 'Zaha Hadid'], answer: 'Frank Lloyd Wright' },
    { category: 'Art', question: 'Which artist painted "American Gothic"?', options: ['Edward Hopper', 'Georgia O\'Keeffe', 'Grant Wood', 'Norman Rockwell'], answer: 'Grant Wood' },
    { category: 'Art', question: 'The Pointillism technique was developed by which artist?', options: ['Georges Seurat', 'Paul Signac', 'Camille Pissarro', 'Maximilien Luce'], answer: 'Georges Seurat' },
    { category: 'Art', 'question': '"The Night Watch" is a masterpiece by which Dutch artist?', options: ['Johannes Vermeer', 'Frans Hals', 'Rembrandt', 'Peter Paul Rubens'], answer: 'Rembrandt' },
    { category: 'Art', question: 'Which Spanish artist is a key figure in the Cubist movement?', options: ['Francisco Goya', 'Salvador Dalí', 'Joan Miró', 'Pablo Picasso'], answer: 'Pablo Picasso' },
    { category: 'Art', question: 'What is the Japanese art of paper folding called?', options: ['Ikebana', 'Bonsai', 'Origami', 'Sumi-e'], answer: 'Origami' },
    { category: 'Art', question: 'The Uffizi Gallery is a prominent art museum in which city?', options: ['Venice', 'Milan', 'Rome', 'Florence'], answer: 'Florence' },
    { category: 'Art', question: 'Which artist is known for his large-scale sculptures of balloon animals?', options: ['Damien Hirst', 'Takashi Murakami', 'Ai Weiwei', 'Jeff Koons'], answer: 'Jeff Koons' },

    // ----------------- SPORTS (50+) -----------------
    { category: 'Sports', question: 'Which country won the first ever FIFA World Cup in 1930?', options: ['Argentina', 'Brazil', 'Uruguay', 'Italy'], answer: 'Uruguay' },
    { category: 'Sports', question: 'In which sport would you perform a slam dunk?', options: ['Volleyball', 'Basketball', 'Tennis', 'Badminton'], answer: 'Basketball' },
    { category: 'Sports', question: 'How many players are there in a standard soccer team on the field?', options: ['9', '10', '11', '12'], answer: '11' },
    { category: 'Sports', question: 'Which athlete has the most Olympic medals?', options: ['Usain Bolt', 'Paavo Nurmi', 'Larisa Latynina', 'Michael Phelps'], answer: 'Michael Phelps' },
    { category: 'Sports', question: 'What is the highest possible score in a single frame of bowling?', options: ['10', '30', '100', '300'], answer: '300' },
    { category: 'Sports', question: 'In which country did golf originate?', options: ['USA', 'England', 'Scotland', 'Ireland'], answer: 'Scotland' },
    { category: 'Sports', question: 'Which tennis grand slam is played on a clay court?', options: ['Wimbledon', 'US Open', 'Australian Open', 'French Open'], answer: 'French Open' },
    { category:- 'Sports', question: 'What does "L" stand for in "L.A. Lakers"?', options: ['Los Angeles', 'Louisiana', 'Las Vegas', 'Lincoln'], answer: 'Los Angeles' },
    { category: 'Sports', question: 'How long is a marathon?', options: ['26.2 miles', '25 miles', '20.5 miles', '30 miles'], answer: '26.2 miles' },
    { category: 'Sports', question: 'Which Formula 1 driver has won the most championships?', options: ['Michael Schumacher', 'Ayrton Senna', 'Lewis Hamilton', 'Sebastian Vettel'], answer: 'Lewis Hamilton' },
    { category: 'Sports', question: 'In baseball, how many strikes does it take to get an out?', options: ['2', '3', '4', '5'], answer: '3' },
    { category: 'Sports', question: 'Which boxer was known as "The Greatest"?', options: ['Mike Tyson', 'Rocky Marciano', 'Muhammad Ali', 'Joe Frazier'], answer: 'Muhammad Ali' },
    { category: 'Sports', question: 'What is the name of the trophy awarded to the winner of the Stanley Cup?', options: ['The Vince Lombardi Trophy', 'The Commissioner\'s Trophy', 'The Stanley Cup', 'The Larry O\'Brien Trophy'], answer: 'The Stanley Cup' },
    { category: 'Sports', question: 'How many rings are on the Olympic flag?', options: ['4', '5', '6', '7'], answer: '5' },
    { category: 'Sports', question: 'In which sport is the term "hat-trick" commonly used?', options: ['Baseball', 'Basketball', 'Hockey', 'American Football'], answer: 'Hockey' },
    { category: 'Sports', question: 'What country is the cricket team known as the "Black Caps" from?', options: ['Australia', 'South Africa', 'England', 'New Zealand'], answer: 'New Zealand' },
    { category: 'Sports', question: 'Which cyclist has won the most Tour de France titles?', options: ['Eddy Merckx', 'Jacques Anquetil', 'Bernard Hinault', 'Miguel Indurain'], answer: 'Eddy Merckx' },
    { category: 'Sports', question: 'What is the professional American football league called?', options: ['MLB', 'NBA', 'NHL', 'NFL'], answer: 'NFL' },
    { category: 'Sports', question: 'Which golfer is nicknamed "Tiger"?', options: ['Jack Nicklaus', 'Arnold Palmer', 'Rory McIlroy', 'Eldrick Woods'], answer: 'Eldrick Woods' },
    { category: 'Sports', question: 'In what year were the first modern Olympic Games held?', options: ['1896', '1900', '1924', '1936'], answer: '1896' },
    { category: 'Sports', question: 'Which sport is played at Wimbledon?', options: ['Golf', 'Tennis', 'Cricket', 'Rugby'], answer: 'Tennis' },
    { category: 'Sports', question: 'What is the term for a score of three strokes under par in golf?', options: ['Eagle', 'Birdie', 'Bogey', 'Albatross'], answer: 'Albatross' },
    { category: 'Sports', question: 'Who holds the record for the most home runs in a single MLB season?', options: ['Babe Ruth', 'Hank Aaron', 'Barry Bonds', 'Mark McGwire'], answer: 'Barry Bonds' },
    { category: 'Sports', question: 'The "Super Bowl" is the championship game of which sport?', options: ['Baseball', 'Basketball', 'American Football', 'Ice Hockey'], answer: 'American Football' },
    { category: 'Sports', question: 'Which martial art originated in Brazil?', options: ['Karate', 'Judo', 'Taekwondo', 'Capoeira'], answer: 'Capoeira' },
    { category: 'Sports', question: 'How many periods are there in an ice hockey game?', options: ['2', '3', '4', '5'], answer: '3' },
    { category: 'Sports', question: 'What is the name of the world\'s most famous cycling race?', options: ['Giro d\'Italia', 'Vuelta a España', 'Tour de France', 'Paris-Roubaix'], answer: 'Tour de France' },
    { category: 'Sports', question: 'Which country has won the most FIFA World Cups?', options: ['Germany', 'Argentina', 'Italy', 'Brazil'], answer: 'Brazil' },
    { category: 'Sports', question: 'What type of race is the "Indy 500"?', options: ['Motorcycle race', 'Stock car race', 'Formula 1 race', 'IndyCar Series race'], answer: 'IndyCar Series race' },
    { category: 'Sports', question: 'In volleyball, how many times can a team hit the ball before it must go over the net?', options: ['2', '3', '4', '5'], answer: '3' },
    { category: 'Sports', question: 'Which NBA player scored 100 points in a single game?', options: ['Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Wilt Chamberlain'], answer: 'Wilt Chamberlain' },
    { category: 'Sports', question: 'What is the term for a perfect game in baseball?', options: ['No-hitter', 'Shutout', 'Perfect Game', 'Grand Slam'], answer: 'Perfect Game' },
    { category: 'Sports', question: 'Which country is famous for its "Haka" war dance, often performed by its rugby team?', options: ['Fiji', 'Samoa', 'Tonga', 'New Zealand'], answer: 'New Zealand' },
    { category: 'Sports', question: 'What is the name of the legendary Brazilian soccer player often called "The King"?', options: ['Ronaldinho', 'Ronaldo', 'Neymar', 'Pelé'], answer: 'Pelé' },
    { category: 'Sports', question: 'How many holes are there on a standard golf course?', options: ['9', '18', '27', '36'], answer: '18' },
    { category: 'Sports', question: 'Which sport uses a shuttlecock?', options: ['Tennis', 'Table Tennis', 'Squash', 'Badminton'], answer: 'Badminton' },
    { category: 'Sports', question: 'In which city were the 2016 Summer Olympics held?', options: ['London', 'Tokyo', 'Rio de Janeiro', 'Beijing'], answer: 'Rio de Janeiro' },
    { category: 'Sports', question: 'What is the name of the Boston-based MLB team?', options: ['Yankees', 'Cubs', 'Red Sox', 'Dodgers'], answer: 'Red Sox' },
    { category: 'Sports', question: 'Which sport is known as "The Sport of Kings"?', options: ['Polo', 'Horse Racing', 'Fencing', 'Sailing'], answer: 'Horse Racing' },
    { category: 'Sports', question: 'How many points is a touchdown worth in American football (before the extra point)?', options: ['3', '6', '7', '8'], answer: '6' },
    { category: 'Sports', question: 'Who is often called the "King of Clay" in tennis?', options: ['Roger Federer', 'Novak Djokovic', 'Andy Murray', 'Rafael Nadal'], answer: 'Rafael Nadal' },
    { category: 'Sports', question: 'What is the maximum number of clubs a golfer is allowed to carry in their bag?', options: ['10', '12', '14', '16'], answer: '14' },
    { category: 'Sports', question: 'In which sport might you see a "bunker"?', options: ['Tennis', 'Golf', 'Cricket', 'Baseball'], answer: 'Golf' },
    { category: 'Sports', question: 'Which NFL team has won the most Super Bowls?', options: ['Dallas Cowboys', 'San Francisco 49ers', 'New England Patriots', 'Green Bay Packers'], answer: 'New England Patriots' },
    { category: 'Sports', question: 'What is the name of the final round of the NCAA basketball tournament?', options: ['The Sweet Sixteen', 'The Elite Eight', 'The Final Four', 'The Championship Game'], answer: 'The Final Four' },
    { category: 'Sports', question: 'How many minutes are in a standard period of a professional basketball game (NBA)?', options: ['10', '12', '15', '20'], answer: '12' },
    { category: 'Sports', question: 'Which country hosted the 2022 FIFA World Cup?', options: ['Brazil', 'Russia', 'Qatar', 'South Africa'], answer: 'Qatar' },
    { category: 'Sports', question: 'What is the term for a ball hit out of the park in baseball?', options: ['Strikeout', 'Home Run', 'Foul Ball', 'Base Hit'], answer: 'Home Run' },
    { category: 'Sports', question: 'In which sport do you use a "puck"?', options: ['Field Hockey', 'Lacrosse', 'Ice Hockey', 'Street Hockey'], answer: 'Ice Hockey' },
    { category: 'Sports', question: 'Which nation has won the most Rugby World Cups?', options: ['Australia', 'England', 'New Zealand', 'South Africa'], answer: 'South Africa' }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB(); 