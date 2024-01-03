require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Gary Jiang (Demo)', 
    email: 'demo@user.io', 
    password: 'password',
    user_prof_img: '',
    birth_date: DateTime.new(1992, 11, 25),
    gender: 'Man',
    optinmarketing: true
  )

  #  ! -------------------------------------------------------------------------------------------
  puts "Creating Gary's glorious playlists"

  # & Kendrick
  kendrick_lamar = Artist.create!(
    artist_name: "Kendrick Lamar",
    verified: true,
    about_blurb: "Kendrick Lamar is an American rapper, songwriter, and record producer. He is regarded as one of the most skillful and successful hip hop artists of his generation.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/kendrick-lamar.jpeg", # Replace with an actual image URL
    global_ranking: 1,
    monthly_listeners: 30000000
  )

  # & Vince
  vince_staples = Artist.create!(
    artist_name: "Vince Staples",
    verified: true,
    about_blurb: "Vince Staples is an American rapper and songwriter known for his sharp social commentary and introspective lyrics. Emerging from the Long Beach, California music scene, his artistry is marked by a unique blend of realism and wit, often reflecting on his upbringing and life experiences.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/vince_staples.jpeg", # Replace with an actual image URL
    global_ranking: 2,
    monthly_listeners: 30000000
  )

  # & Baby Keem
  baby_keem = Artist.create!(
    artist_name: "Baby Keem",
    verified: true,
    about_blurb: "American rapper, songwriter, and record producer, first gained recognition with his 2019 single 'Orange Soda' and his debut studio album, 'Die for My Bitch.' His innovative approach to hip-hop, characterized by his playful flow and eclectic production choices, has marked him as a rising star in the music industry.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/baby_keem.jpeg", # Replace with an actual image URL
    global_ranking: 2,
    monthly_listeners: 30000000
  )

  # & Oliver Malcolm
  oliver_malcolm = Artist.create!(
    artist_name: "Oliver Malcolm",
    verified: true,
    about_blurb: "Oliver Malcolm is a Swedish-English artist and producer known for his genre-blending approach, which merges elements of hip-hop, rock, and electronic music. His distinct sound, characterized by energetic beats and raw, emotive lyrics, has established him as an emerging talent in the alternative music scene.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/oliver_malcolm.jpeg", # Replace with an actual image URL
    global_ranking: 3,
    monthly_listeners: 30000000
  )

  # & slowthai
  slowthai = Artist.create!(
    artist_name: "Slowthai",
    verified: true,
    about_blurb: "British rapper known for his gritty and often controversial lyrics, has emerged as a distinct voice in the UK hip-hop scene. His music, which blends elements of punk and grime, is celebrated for its raw energy and unflinching social commentary, reflecting his experiences growing up in Northampton, England.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/slowthai.jpeg", # Replace with an actual image URL
    global_ranking: 4,
    monthly_listeners: 30000000
  )
  # & Kenny Beats
  kenny_beats = Artist.create!(
    artist_name: "Kenny Beats",
    verified: true,
    about_blurb: " American record producer and songwriter renowned for his versatile production style, which spans across hip-hop, trap, and electronic music. He has gained acclaim for his collaborative work with a diverse range of artists, including Vince Staples, Rico Nasty, and Freddie Gibbs, showcasing his ability to adapt to and enhance each artist's unique sound.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/kenny_beats.jpeg", # Replace with an actual image URL
    global_ranking: 5,
    monthly_listeners: 30000000
  )

  # ! Albums & Songs --------------------------------------------------------------------
  # ~ 'Mr. Morale & the Big Steppers'
  mr_morale_album = Album.create!(
    artist_id: kendrick_lamar.id,
    title: "Mr. Morale & the Big Steppers",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/kendrick.png", # Replace with an actual image URL
    release_date: DateTime.new(2022, 5, 13),
    record_company: "Top Dawg Entertainment"
  )
  # List of songs in the album
  mr_morale_songs = [
    "United in Grief",
    "N95",
    "Worldwide Steppers",
    "Die Hard",
    "Father Time",
    "Rich (Interlude)",
    "Rich Spirit",
    "We Cry Together",
    "Purple Hearts",
    "Count Me Out",
    "Crown",
    "Silent Hill",
    "Savior (Interlude)",
    "Savior",
    "Auntie Diaries",
    "Mr. Morale",
    "Mother I Sober",
    "Mirror"
  ]
  # Create songs for the album
  mr_morale_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: kendrick_lamar,  
      album_id: mr_morale_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/mrmorale/kendrick-mm-song-#{index + 1}.mp3"
    )
  end

  # ~ 'Big Fish Theory by Vince Staples' ------------------------------------------------
  big_fish_album = Album.create!(
    artist_id: vince_staples.id,
    title: "Big Fish Theory",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/vince-staples-big-fish.jpeg", # Replace with an actual image URL
    release_date: DateTime.new(2017, 6, 23),
    record_company: "Blacksmith Records & Def Jam Recordings"
  )
  # List of songs in the album
  big_fish_songs = [
    "Crabs in a Bucket",
    "Big Fish",
    "Alyssa Interlude",
    "Love Can Be...",
    "745",
    "Ramona Park Is Yankee Stadium",
    "Yeah Right",
    "Homage",
    "SAMO",
    "Party People",
    "BagBak",
    "Rain Come Down"
  ]
  # Create songs for the album
  big_fish_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: vince_staples,  
      album_id: big_fish_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/big-fish/vince-big-fish-song-#{index + 1}.mp3"
    )
  end

  # ~ 'The Melodic Blue by Baby Keem' ------------------------------------------------
  melodic_blue_album = Album.create!(
    artist_id: baby_keem.id,
    title: "The Melodic Blue",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/baby-keem-melodic-blue.jpeg", # Replace with an actual image URL
    release_date: DateTime.new(2021, 9, 10),
    record_company: "PGLang & Columbia Records"
  )
  # List of songs in the album
  melodic_blue_songs = [
    "Trademark USA",
    "Pink Panties",
    "Scapegoats",
    "Range Brothers",
    "Issues",
    "Gorgeous",
    "Lost Souls",
    "Cocoa",
    "Family Ties",
    "Scars",
    "Durag Activity",
    "Booman",
    "First Order of Business",
    "Vent",
    "16"
  ]

  # Create songs for the album
  melodic_blue_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: baby_keem,  
      album_id: melodic_blue_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/melodic-blue/baby-keem-melodic-blue-song-#{index + 1}.mp3"
    )
  end

  # ~ 'Are You Living In The Real World? by Oliver Malcolm' ------------------------------------------------
  real_world_album = Album.create!(
    artist_id: oliver_malcolm.id,
    title: "Are You Living In The Real World?",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/oliver-malcolm-real-world.jpeg", # Replace with an actual image URL
    release_date: DateTime.new(2021, 5, 20),
    record_company: "Darkroom & Interscope"
  )
  # List of songs in the album
  real_world_songs = [
    "Runaway",
    "Kevin",
    "Switched Up",
    "Looks",
    "The Machine",
    "Helen",
    "The Jungle",
    "Skywalker"
  ]

  # Create songs for the album
  real_world_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: oliver_malcolm,  
      album_id: real_world_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/real-world/oliver-malcolm-real-world-song-#{index + 1}.mp3"
    )
  end

  # ~ 'Nothing Great About Britain by Slowthai' ------------------------------------------------
  nothing_great_album = Album.create!(
    artist_id: slowthai.id,
    title: "Nothing Great About Britan",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/slowthai-nothing-great.png", # Replace with an actual image URL
    release_date: DateTime.new(2019, 5, 17),
    record_company: "METHOD"
  )
  # List of songs in the album
  nothing_great_songs = [
    "Nothing Great About Britain",
    "Doorman",
    "Dead Leaves",
    "Gorgeous",
    "Crack",
    "Grow Up",
    "Inglorious",
    "Toaster",
    "Peace Of Mind",
    "Missing",
    "Northampton's Child"
  ]

  # Create songs for the album
  nothing_great_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: slowthai,  
      album_id: nothing_great_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/nothing-great/slowthai-nothing-great-song-#{index + 1}.mp3"
    )
  end

  # ~ 'Louie by Kenny Beats' ------------------------------------------------
  louie_album = Album.create!(
    artist_id: kenny_beats.id,
    title: "Louie",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/kenny-beats-louie.png", # Replace with an actual image URL
    release_date: DateTime.new(2022, 8, 31),
    record_company: "XL Recordings"
  )
  # List of songs in the album
  louie_songs = [
    "Leonard",
    "Parenthesis",
    "Hold My Head",
    "So They Say",
    "Family Tree",
    "Hooper",
    "Still",
    "Moire",
    "Get Around",
    "Eternal",
    "Last Words",
    "Drop 10",
    "The Perch",
    "Really Really",
    "That Third Thing",
    "Rotten",
    "Hot Hand"
  ]

  # Create songs for the album
  louie_songs.each_with_index do |song_title, index|
    Song.create!(
      artist: kenny_beats,  
      album_id: louie_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/louie/kenny-beats-louie-song-#{index + 1}.mp3"
    )
  end
  
  #  ! -------------------------------------------------------------------------------------------

  # ^ The Rest of the Database (Faker)
  10.times do 
    # User.create!({
    #   username: Faker::Internet.unique.username(specifier: 3),
    #   email: Faker::Internet.unique.email,
    #   password: 'password',
    #   birth_date: DateTime.new(rand(1970..2005), rand(1..12), rand(1..28)),
    #   gender: ['Male', 'Female', 'Other'].sample,
    #   optinmarketing: [true, false].sample
    # }) 

    # Function to create mock artists
    def create_mock_artists(number_of_artists)
      number_of_artists.times do
        Artist.create(
          artist_name: Faker::Music.band,
          verified: [true, false].sample,
          about_blurb: Faker::Lorem.sentence(word_count: 20),
          about_img: Faker::LoremFlickr.image(size: "300x300", search_terms: ['artist']),
          global_ranking: rand(1..1000),
          monthly_listeners: rand(10000..1000000)
        )
      end
    end

    # Function to create mock albums
    def create_mock_albums(number_of_albums)
      artist_ids = Artist.where.not(id: 1).pluck(:id)

      number_of_albums.times do
        Album.create(
          artist_id: artist_ids.sample,
          title: Faker::Music.album,
          genre: Faker::Music.genre,
          cover_img: Faker::LoremFlickr.image(size: "300x300", search_terms: ['album']),
          release_date: rand(1900..2023),
          record_company: Faker::Company.name
        )
      end
    end

    # Function to create mock songs
    def create_mock_songs(number_of_songs)
      album_ids = Album.where.not(artist_id: 1).pluck(:id)
    
      number_of_songs.times do
        Song.create(
          artist: Artist.where.not(id: 1).sample,  # Use artist object
          album_id: album_ids.sample, # Use album ID
          title: Faker::Music::RockBand.song,
          duration: rand(120..300),
          explicit: [true, false].sample
        )
      end
    end

    
    # Create artists, albums, and songs
    create_mock_artists(10)
    create_mock_albums(50)
    create_mock_songs(200)
  end

  puts "Done!"
end