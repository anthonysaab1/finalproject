import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:video_player/video_player.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Movie App')),
        body: MovieList(),
      ),
    );
  }
}

class MovieList extends StatefulWidget {
  @override
  _MovieListState createState() => _MovieListState();
}

class _MovieListState extends State<MovieList> {
  List<dynamic> originalDatas = [];
  List<dynamic> datas = [];
  Map<int, bool> favoriteStatus = {}; // To track the favorite status locally

  @override
  void initState() {
    super.initState();
    fetchMovies();
  }

  Future<void> fetchMovies() async {
    final response = await http
        .get(Uri.parse('http://localhost/finalproject/get_movies.php?id=1'));
    if (response.statusCode == 200) {
      setState(() {
        originalDatas = json.decode(response.body).map((data) {
          data['id'] = int.parse(data['id'].toString());
          data['category_id'] = int.parse(data['category_id'].toString());
          return data;
        }).toList();
        datas = List.from(originalDatas);
        print('Fetched original data: $originalDatas');
      });
    } else {
      throw Exception('Failed to load movies');
    }
  }

  void filterCategories(int category) {
    setState(() {
      datas = originalDatas.where((ca) {
        int itemCategoryId = ca['category_id'] as int;
        return itemCategoryId == category;
      }).toList();
    });
  }

  void favVideo(int id) {
    setState(() {
      favoriteStatus[id] = !(favoriteStatus[id] ?? false);
    });
  }

  Future<void> _refreshMovies() async {
    await fetchMovies();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _refreshMovies,
      child: Column(
        children: [
          Row(
            children: [
              ElevatedButton(
                onPressed: () => filterCategories(3),
                child: Text('Action'),
              ),
              ElevatedButton(
                onPressed: () => filterCategories(2),
                child: Text('Comedy'),
              ),
              ElevatedButton(
                onPressed: () => filterCategories(1),
                child: Text('Drama'),
              ),
              ElevatedButton(
                onPressed: () => filterCategories(4),
                child: Text('Thriller'),
              ),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    datas = List.from(originalDatas); // Reset to original data
                  });
                },
                child: Text('All'),
              ),
            ],
          ),
          Expanded(
            child: ListView.builder(
              itemCount: datas.length,
              itemBuilder: (context, index) {
                final movie = datas[index];
                int movieId = movie['id'] as int;
                return ListTile(
                  title: Text(movie['title']),
                  leading: Image.network(movie['image']),
                  trailing: IconButton(
                    icon: Icon(
                      favoriteStatus[movieId] == true
                          ? Icons.favorite
                          : Icons.favorite_border,
                      color: favoriteStatus[movieId] == true
                          ? Colors.red
                          : Colors.black,
                    ),
                    onPressed: () => favVideo(movieId),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => VideoScreen(movie['video']),
                    ));
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class VideoScreen extends StatefulWidget {
  final String videoUrl;

  VideoScreen(this.videoUrl);

  @override
  _VideoScreenState createState() => _VideoScreenState();
}

class _VideoScreenState extends State<VideoScreen> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.network(widget.videoUrl)
      ..initialize().then((_) {
        setState(() {});
      }).catchError((error) {
        print('Error initializing video player: $error');
      });
    _initializeVideoPlayerFuture = _controller.initialize();
    _controller.setLooping(true); // Loop the video
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Video Player')),
      body: FutureBuilder(
        future: _initializeVideoPlayerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              child: Stack(
                alignment: Alignment.bottomCenter,
                children: [
                  VideoPlayer(_controller),
                  VideoProgressIndicator(
                    _controller,
                    allowScrubbing: true,
                  ),
                  VideoControls(_controller),
                ],
              ),
            );
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class VideoControls extends StatelessWidget {
  final VideoPlayerController controller;

  const VideoControls(this.controller);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              icon: Icon(Icons.play_arrow),
              onPressed: () {
                if (!controller.value.isPlaying) {
                  controller.play();
                }
              },
            ),
            IconButton(
              icon: Icon(Icons.pause),
              onPressed: () {
                if (controller.value.isPlaying) {
                  controller.pause();
                }
              },
            ),
            IconButton(
              icon: Icon(Icons.replay),
              onPressed: () {
                controller.seekTo(Duration.zero);
              },
            ),
          ],
        ),
      ],
    );
  }
}
