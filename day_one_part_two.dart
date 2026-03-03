import 'dart:convert';
import 'dart:io';

void main() async {
  final file = File('day_one_input.txt');
  final lines = file
      .openRead()
      .transform(utf8.decoder)
      .transform(LineSplitter());

  int count = 0;
  int value = 50;

  await for (var line in lines) {
    final direction = line[0];
    final amount = int.parse(line.substring(1));

    if (direction == 'R') {
      for (var i = 0; i < amount; i++) {
        value = (value + 1) % 100;
        if (value == 0) {
          count += 1;
        }
      }
    } else if (direction == 'L') {
      for (var i = 0; i < amount; i++) {
        value = (value - 1) % 100;
        if (value == 0) {
          count += 1;
        }
      }
    } else {
      throw Exception();
    }
  }

  print(count);
}
