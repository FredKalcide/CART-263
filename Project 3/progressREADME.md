# Playful Interaction - Touch the Targets
##### Frederik, Tania. April 2023 

![](img.png)
Don't forget to add an image, it really helps us understand your project better. 

We intend to make a sort of dancing game using the camera that has a person wave at targets on the screen as quick as possible to complete the moves in a record time.  

Describe what you've made and how it works, who it is for and why you made it. You may want to include multiple images or drawings or diagrams. Use spell check. 

## Progress notes
Tania figured out reversing the camera image so movement in front of it is intuitive
We have both independently figured out color tracking on the camera
We intend to have 2 targets appear alternatively for our playtest
Done, 2 targets appear alteratively when the color being searched for appears around them


## to dos (in no particular order)
we need to figure out how the color detection will work with the ASCII filter, given that such a filter turns everything to B&W. maybe the filter is activated when we calibrate with mouse click/ when we press a key, and the p5 color tracks the colored image, but we only see the filtered image
commenting the code on color tracking in a concise fashion (I, Fred, will rewatch the tutorial on color Tracking and use it to comment the code better)
commenting the code on flipping the camera feed
locking exposure of webcam/ finding & using camera that can have its exposure locked
leaderboard
timer
targets appear on screen and disappear when "hit" (do with OOT)
title screen
sfx
another idea: when a target appears, theres a timer that starts (not shown to the player) and depending on how long it takes for the player to "touch" the target, text appears and disappear real quick, saying either "GREAT!" or "MISS..." like those rhythm games where the game gives you feedback on the timing of your inputs with little text like that.

Also, it would be interesting and satisfying to maybe add some sounds or music in some sort since it is a game so that we could give some dopamine reward to the player in the game. Maybe creating some sounds with oscillators etc .. 

I would maybe like for the targets to appear as small little points, ( particle systems maybe)  or that the target is actually made of the ascii symbols but that a given region become of a certain other color and shape ( lets say a red circle )  when the curser goes on it ( the player hand movement ), it collides with it and makes the ascii target collide,  explode  a little and disappear so that it then reappers a second later to it's initial default font and color 


## Installation
Here, you'll describe how to run your code. Do you have libraries? Do you need to configure something? Make it clear, provide inks and commands. 
``` You can add code like this if needed  ``` 

Users should be able to copy/paste the code and run it in the terminal or copy the URL and download what they need. 

If you need to edit code to make it work, like commenting out or running specific lines for certain features, you can detail it here. 

## Run
How to run your code? If there is a command, write it. Does the browser need to be resized? Do you need to connect a microphone? Tell us!

The code runs on a local server, as of now we only need a webcam and we would figure out color detection. We thought about using a kinnect, but we wanted to try to figure out if we can do it on webcam first before going on to to complex for our level of knowledge.  

If your work needs a physical setup or other hardware, describe it here, or give us a diagram.

## Future iterations
What do you hope to add in the future and what did you not have time for? 
I would like for the targets to appear as small little points, ( particle systems maybe)  or that the target is actually made of the ascii symbols but that a given region become of a certain other color and shape ( lets say a red circle )  when the curser goes on it ( the player hand movement ), it collides with it and makes the ascii target collide,  explode  a little and disappear so that it then reappers a second later to it's initial default font and color 


## Sketches, ideas
Include any sketches, mood boards, or ideas you went through. Explain them clearly.
here is one example of an Ascii portrait I made in the console which i would like to use as filter, insparion for the project 
999$99898998888889999988999999998$#$8666531!bccc
788988888999899899999988899899999$W97666531!bc;;
5566666778899999998899999987899999987665531!bc;;
2233334577889999998899989975678888766665431!bc;;
0012223467899$99999999887620135787656665431?abbb
??000124678999999999999741a;ca04766667654320?!!!
??0000236788888989999$983?;=-+b16666776544321000
000001245788778889999$983?:-,,;05566766554322222
000001245677666789989$$83a+-._=a3577765444433444
000001235677545679999985?c=,__=b2578766555444444
00??01235676424568999852b+-,__-;0488766655555555
0????023467532357899973?:=,,..-+b279766665555555
0????0234665323568$$950c=,.,,,,=:?68766666566666
00??001346763235689862a:-,,-=--,=b26776666666777
110000135676545678851a:===+++=-.,:!2566655667777
22110012567766678861b:==+:;c;+-..=c0356555667777
32220?03467788778861ac;;bbab;+-,.,+c045566667767
333210024577888889741?!?0??a;=-,..-:a25666557666
44442112456778888986543231?b:=-,,..-:!2666667666
55554323556555677888777530ac+=-,...,=:?367767655
6677655566642246767889972!;:=--,...,,-c036776555
7788877766531024433458961b:+=-,..,,..,:a03667656
88899888775300132??02675?c==,..,,,-,.,-+c?357765
88999999975311131!a!0575!:-,._.,,---,,,.+b036755
88999899998632331!!?0574b=.__..--===-,..-=c04556
99999889999742231!!01573b-._.,,--+++-,...,+a1356
999888889$$952221??02562c-__.,-==+::=-,,__,:a145
988887889$W942111??02441;-._.,-==+::+---...-;?24
98888889$$$831110!!?0220;-,...,=+:;:==--,..,+b02
8888889$$$$73011?abba??!:--,..,=:::+=---,,..=;!0
8888878899962011?!bccbbc+---...=::+=-,,,,-,.,:b!
88776666888621110?ac;;::+---,.,=++=-,,,,,-,..=ca
877753234665200101?b:+------,,,-=--,...,,-,._-;c
887630??02320!!?01?b;=,,-,,,,,,--,,.....,,.__-;c
88862accba??abba?00a:-._,,...---,.___...,.. _-;c
88862b:+::;;;:;ca??c+,__.,._.,-,,.___......_.=;c
78872b+-------+:b!a:-.__...__,-,,.__.,,.._..,+cc
78873!:=-,....-:cab+,._....__.,,,.__.,..___.,+cb
888751ac::+-..-:c!!;=,....__..,,..__.....__.,:b!
8888641?!ab;-.,:a??b:=,..___.,,,.___....,._.,:a0
88887643221!:-=;!22!;+-,,,..,,,,.__.........,:!0
888887766762b:;b044?c:=-,,,.,,,,.._.........,;?0
888888889$94!;ca1550c:=---,,,--,,...........,;?1
998888999$94a:;a2650c+=---,,,--,,...........-;?0
999888889$83a:;a1550c+==--,.,,,,,...........,:a?
999999999982b+:c?33!;+=--,...,,,.........___.=ca
899999998871c==;a11a:=-,-,._..,....____._ _-:c
888999998861c==:a00b:=-,,,.__.,....______ ,:;

Found a cool minigame that includes multiples games on it, such as a press the target one one. Here is the link ! 

target video game example : https://matchmaker.merci-michel.com/



## Credits, resources, etc 
We used a tutorial on color tracking from Youtube, to get some webcam tracking. CP2: Object Detection – Webcam Tracking in p5.js/TensorFlow! From jeff Thompson. 
As for AScii aesthetic I am currently exploring and experimenting with the aid of the coding train's tutorial by Daniel Shiffman which is the coding challenge 166 ; Ascii text images. 
## Anything else? 
Add it!

## Notes on code comments and documentation

Documentation is a critical part of writing code. It is for you, but also for others you might want to share your code with. If you have ever used code written by someone else, think about what they could have done to help you understand it better. If you're proud of your code, documenting it can help others learn.

Imagine: its 2 years from now and you've completely forgotten what you wrote, and your gallery show has to be installed tomorrow. Your code almost works, but you can't remember what you wrote. What might help you make changes quickly and remember what you write?

- Always comment your code. Add your name and project title in the main code file.  
- Every function should be named described clearly according to what they do.  
- All variables should have clear and reasonable names that describe what they do. 
- Sections of code that make decisions or perform complex tasks should be described clearly in comments.  
- Sections of code borrowed from other places should be cited and linked.  
- Old code should be removed!  
- Make your readme file clear and readable. 
