class Metronome
{
    constructor(tempo = 120)
    {
        this.audioContext = null;
        this.notesInQueue = [];
        this.currentBeatInBar = 0;
        this.beatsPerBar = 4;
        this.tempo = tempo;
        this.lookahead = 25;
        this.scheduleAheadTime = 0.1;
        this.nextNoteTime = 0.0;
        this.isRunning = false;
        this.intervalID = null;
    }
    nextNote()
    {
        var secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += secondsPerBeat;
        this.currentBeatInBar++;
        if (this.currentBeatInBar == this.beatsPerBar) {
            this.currentBeatInBar = 0;
        }
    }
    scheduleNote(beatNumber, time)
    {
        this.notesInQueue.push({ note: beatNumber, time: time });
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();
        osc.frequency.value = (beatNumber % this.beatsPerBar == 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);
        osc.start(time);
        osc.stop(time + 0.03);
    }
    scheduler()
    {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
            this.scheduleNote(this.currentBeatInBar, this.nextNoteTime);
            this.nextNote();
        }
    }
    start()
    {
        if (this.isRunning) return;
        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        this.isRunning = true;
        this.currentBeatInBar = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;
        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }
    stop()
    {
        this.isRunning = false;
        clearInterval(this.intervalID);
    }
    startStop()
    {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
}
var metronome = new Metronome();
var tempo = document.getElementById('tempo');
tempo.textContent = metronome.tempo;
var playPauseIcon = document.getElementById('play-pause-icon');
var playButton = document.getElementById('play-button');
playButton.addEventListener('click', function() {
    metronome.startStop();

    if (metronome.isRunning) {
        playPauseIcon.className = 'pause';
    }
    else {
        playPauseIcon.className = 'play';
    }

});
var tempoChangeButtons = document.getElementsByClassName('tempo-change');
for (var i = 0; i < tempoChangeButtons.length; i++) {
    tempoChangeButtons[i].addEventListener('click', function() {
        metronome.tempo += parseInt(this.dataset.change);
        tempo.textContent = metronome.tempo;
    });
}