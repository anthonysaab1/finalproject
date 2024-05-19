import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:video_player/video_player.dart';

void main() {
  runApp(MyApp());
}

class LocalStorage {
  static Map<String, dynamic> _storage = {};

  static void setItem(String key, dynamic value) {
    _storage[key] = value;
  }

  static dynamic getItem(String key) {
    return _storage[key];
  }

  static void removeItem(String key) {
    _storage.remove(key);
  }
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
        originalDatas = json.decode(response.body);
        datas = List.from(originalDatas);

        // Debugging information
        print('Fetched original data: $originalDatas');
      });
    } else {
      throw Exception('Failed to load movies');
    }
  }

  void filterCategories(int category) {
    setState(() {
      print('Filtering data for category: $category');
      print('Current original data: $originalDatas');

      datas = originalDatas.where((ca) {
        int itemCategoryId = int.tryParse(ca['category_id'].toString()) ?? -1;
        bool matches = itemCategoryId == category;
        print(
            'Checking item with category_id: ${itemCategoryId} against selected category: $category - Match: $matches');
        return matches;
      }).toList();

      print('Filtered data: $datas');
      print('Selected category: $category');
    });
  }

  void favVideo(int id, dynamic movie) {
    String userId = LocalStorage.getItem('userId');
    if (userId == null || !userId.contains(id.toString())) {
      LocalStorage.setItem('userId', (userId ?? '') + id.toString() + ',');
      // Your code to favorite the video goes here
    } else {
      setState(() {
        datas = datas.map((item) {
          if (item['id'] == id) {
            item['user_fav'] = 0;
          }
          return item;
        }).toList();
      });
    }
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
                return ListTile(
                  title: Text(movie['title']),
                  leading: Image.network(movie['image']),
                  trailing: IconButton(
                    icon: Icon(movie['user_fav'] == 1
                        ? Icons.favorite
                        : Icons.favorite_border),
                    onPressed: () => favVideo(movie['id'], movie),
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
