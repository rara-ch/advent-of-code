import 'dart:io';

void main() async {
  final file = File('day_two_input.txt');
  final ranges = (await file.readAsString()).split(',');

  var output = 0;

  for (var range in ranges) {
    final rangeValues = range.split('-');
    final start = int.parse(rangeValues[0]);
    final end = int.parse(rangeValues[1]);

    for (var i = start; i <= end; i++) {
      print('hello');
      final value = i.toString();

      if (value.length % 2 == 1) continue;

      if (value
              .substring(0, value.length - 1)
              .compareTo(value.substring(value.length)) ==
          0) {
        output += i;
      }
    }
  }

  print(output);
}
