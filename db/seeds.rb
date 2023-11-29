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
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password',
    birth_date: DateTime.new(1990, 1, 1),
    gender: 'Man',
    optinmarketing: true
  )

  # Create Kendrick Lamar as an artist
  kendrick_lamar = Artist.create!(
    artist_name: "Kendrick Lamar",
    verified: true,
    about_blurb: "Kendrick Lamar is an American rapper, songwriter, and record producer. He is regarded as one of the most skillful and successful hip hop artists of his generation.",
    about_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/artists/about_img/kendrick-lamar.jpeg", # Replace with an actual image URL
    global_ranking: 1,
    monthly_listeners: 30000000
  )

  # Create the album 'Mr. Morale & the Big Steppers'
  mr_morale_album = Album.create!(
    artist_id: kendrick_lamar.id,
    title: "Mr. Morale & the Big Steppers",
    genre: "Hip-Hop",
    cover_img: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/kendrick.png", # Replace with an actual image URL
    release_date: DateTime.new(2022, 5, 13),
    record_company: "Top Dawg Entertainment"
  )

  # List of songs in the album
  songs = [
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
  songs.each_with_index do |song_title, index|
    Song.create!(
      artist: kendrick_lamar,  
      album_id: mr_morale_album.id,
      title: song_title,
      duration: rand(180..240), # Random duration between 3 to 4 minutes
      explicit: true,
      song_url: "https://motify-seeds.s3.us-east-2.amazonaws.com/static/audio/mrmorale/kendrick-mm-song-#{index + 1}.mp3"
    )
  end
  

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      birth_date: DateTime.new(rand(1970..2005), rand(1..12), rand(1..28)),
      gender: ['Male', 'Female', 'Other'].sample,
      optinmarketing: [true, false].sample
    }) 
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