Author: Steven Yi

Example of a multi-sample sampler instrument. This example loads in sound files into f-tables 
with numbers 1-12.  (These are loaded in the score.)  Loop point data, taken from the sample set's 
readme.txt, are stored here in a global i-type array. fillarray is used to create the array with 
filled in values. 

The sample set had samples labelled with MIDI note numbers (i.e., 60 is middle-c on the piano keyboard). 
The sample set recorded samples every 6 MIDI note numbers, and each note number maps to a scale degree. 
With 12 being an octave, you can see that the sample set has two samples recorded per octave. 

For this example, lposcil is used to play the f-table and loops at the given start and end loop points. 
The SamplePlayer instrument takes in a MIDI note number to play (p4) and an amplitude in decibels (p5). 
The MIDI note number is then used to figure out what f-table to play and used to lookup the start and 
end loop points from the giloop_points[] array.  

Note: Any text, like the above, will be ignore by Csound when it is placed
outside of the CsoundSynthesizer tags.


<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 64 
0dbfs = 1
nchnls = 2

;; Mixing signals
ga1 init 0
ga2 init 0


;; The following array of i-vals contains the start and end looping points given in the
;; SynthStrings1-WAV-20160913/readme.txt. 
;; This variable starts with a g- to denote it is a global value, the second letter i denotes
;; it is of i-type, and the [] at the end denotes it is an array. 
giloop_points[] = fillarray(304, 620744, 239, 218136, 147, 387489, 118, 218916,
                           75, 216802, 35, 354941, 20, 250855, 40, 177603, 
                           20, 125022, 22, 75130, 46, 182387, 30, 125918)

;; Looping Table player
;; Load in an f-table with GEN01 and specify which channel to load to 
;; ensure the generated table is mono
instr SamplePlayer
  ifreq = cpsmidinn(p4)
  iamp = ampdbfs(p5)
  itab_index = int((p4 - 30)  / 6)
  itable = itab_index + 1  ;; calculate the f-table number
  ibase_freq = cpsmidinn( p4 - (p4 % 6) )  ;; calculate the base frequency for the audio file 
                                           ;; the name of the file has a MIDI note number
  iloop_start_sample = giloop_points[itab_index * 2] 
  iloop_end_sample = giloop_points[itab_index * 2 + 1]

  ipan = 0.5  ;; hardcode to center

  ispeed = ifreq / ibase_freq

  ;; https://csound.com/docs/manual/lposcil.html
  asig = lposcil:a(iamp, ispeed, iloop_start_sample, iloop_end_sample, itable)

  asig *= linsegr(0, 0.01, 1, 2, 0)

  ;; Pan the signal between left and right channel
  ;; pan2 uses range of 0 (hard left) to 1 (hard right)
  ;; must use the older style syntax as it has more than one output signals
  aleft, aright pan2 asig, limit:i(ipan, 0, 1)
   
;  out(aleft, aright)
  ga1 += aleft
  ga2 += aright

endin

;; Score generating instrument. 
;; starts at a given MIDI note number (p4)
;; and plays for x number of notes (p5) 
;; at a given decibel for amplitude (p6).
;; p3 is used by this instrument as part of its calculations for start times for generated notes.
instr NoteRun
  inote_dur = p3
  istart_midi_note_num = p4 
  idur = random:i(0.8, 2)
  inum_notes = int(random:i(5, 10)) 
  idecibels = -18 

  indx = 0
  istart = 0
  while (indx < inum_notes) do
    indur = int(random:i(4, 16)) / 4 * idur
    schedule("SamplePlayer", istart, indur * 0.99, istart_midi_note_num + int(random:i(0, 5)) * 2, idecibels)
    istart += indur
    indx +=1
  od

  schedule(p1, istart + random:i(2, 5), 0, istart_midi_note_num)
endin

schedule("NoteRun", 0, 0, 60)
schedule("NoteRun", 4, 0, 72)
schedule("NoteRun", 7, 0, 36)

instr Mixer 
  
  ;; REVERB SEND MIXING
  a1, a2 reverbsc ga1, ga2, 0.80, 10000
  
  a1 = ntrpol(a1, ga1, 0.8)
  a2 = ntrpol(a2, ga2, 0.8)  
  
  out(a1, a2)
  ga1 = 0
  ga2 = 0
endin 

schedule("Mixer", 0, -1)

</CsInstruments>
<CsScore>
;; Use GEN01 to load file
;; https://csound.com/docs/manual/GEN01.html
;; The below are "f-statements" for loading function tables. 
;; p1 - the table number to assign to
;; p2 - start time of when to load the file
;; p3 - size of table, 0 denotes deferred table size, so have the GEN routine 
;; calculate it for you 
;; p4 - use GEN01
;; rest of arguments: specific to GEN01, see documentation above

;; These samples are from the Freepats project
;; http://freepats.zenvoid.org/Synthesizer/synth-strings.html
f 1 0 0 1  "SynthStrings1-30.wav" 0 0 1
f 2 0 0 1  "SynthStrings1-36.wav" 0 0 1
f 3 0 0 1  "SynthStrings1-42.wav" 0 0 1
f 4 0 0 1  "SynthStrings1-48.wav" 0 0 1
f 5 0 0 1  "SynthStrings1-54.wav" 0 0 1
f 6 0 0 1  "SynthStrings1-60.wav" 0 0 1
f 7 0 0 1  "SynthStrings1-66.wav" 0 0 1
f 8 0 0 1  "SynthStrings1-72.wav" 0 0 1
f 9 0 0 1  "SynthStrings1-78.wav" 0 0 1
f 10 0 0 1 "SynthStrings1-84.wav" 0 0 1
f 11 0 0 1 "SynthStrings1-90.wav" 0 0 1
f 12 0 0 1 "SynthStrings1-96.wav" 0 0 1

f0 36000

</CsScore>
</CsoundSynthesizer>
