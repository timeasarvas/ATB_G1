var jspsych = initJsPsych({
    override_safe_mode: true
});
var timeline = [];
var start_instructions = {
  type: jsPsychInstructions,
  pages: [
    `Vielen Dank für Ihre Bereitschaft, an dieser Studie teilzunehmen! Die Studie wird im Rahmen des Sonderforschungsbereichs 1287 "Die Grenzen der Variabilität in der Sprache“ der Universität Potsdam durchgeführt. Weitere Informationen finden Sie auf der Webseite. Bei Fragen wenden Sie sich bitte an Timea Sarvas. Bitte beachten Sie, dass diese Studie aus zwei Sitzungen besteht. Dies ist die erste Sitzung. Die vollständige Vergütung i. H. v. 3£ erhalten Sie nur, wenn Sie an beiden Sitzungen teilgenommen haben. Über die zweite Sitzung werden Sie nach vier Wochen ebenfalls über Prolific informiert.`
  ],
  allow_backward: false,
  show_clickable_nav: true,
  button_label_next: "Weiter"
};

timeline.push(start_instructions);

// Define the trial structure
var trial_timeline = [];

// Load the CSV file
Papa.parse("material/list1.csv", {
  header: true,
  download: true,
  complete: function(results) {
    // For each row in the CSV file
    for (var i = 0; i < results.data.length; i++) {
      var row = results.data[i];

      // Define the trial
      var trial = {
        type: 'html-button-response',
        stimulus: '<p>' + row.context + '</p>' + '<p>' + row.item + '</p>',
        choices: ['Ja', 'Nein'],
        prompt: '<p>' + row.question1 + '</p>' + '<p>' + row.question2 + '</p>',
        data: {
          type: row.type,
          condition: row.condition
        }
      };

      // Add the trial to the timeline
      trial_timeline.push(trial);
    }

    // Initialize jsPsych
    // jsPsych.init({
    //  timeline: trial_timeline,
    //  on_finish: function() {
    //    jsPsych.data.displayData();
      }
    });

timeline.push(trial_timeline);

jspsych.run(timeline);
