# sqlite_query_evaluator
sqlite_evaluator in functional language gofer 

This is simple project for sqlite_evalutor in gofer language done in IP course of MCA-I year. 

# what is does?
   It takes a queries like create table,select,delete in a perticular format and evaluates that and gives us a result.

# How to run?
To run this You need to install gofer in your computer.
To install gofer in linux follow procedure:

Install prerequisites

$ sudo apt-get install gcc build-essential git emacs

Clone gofer

$ git clone https://github.com/rusimody/gofer.git

Build
Above should make a directory called gofer Usually in your home but that depends on where you ran the git clone

cd gofer/src # Or wherever you have put it

$ make

Check executable
Above should make an executable called gofer. When you run it (at shell as:)


$ ./gofer

you should get an error that prelude not found

Set the path thus at shell (make sure the path below is correct!)

$ export PUGOFER=/home/[yourname]/gofer/pusimple.pre

Now gofer should run (at shell) ie

$ ./gofer

should start

Emacs Setup

Directory setup

Make a directory called elisp in ~/.emacs.d

$ cd ~/.emacs.d

$ mkdir elisp

Copy contents

Copy the files pugofer-init.el and pugofer.el into this elisp directory

Init setup

Add this line to end of ~/.emacs.d/init.el

(add-to-list 'load-path (expand-file-name "~/.emacs.d/elisp"))

Change paths

Look for setenv calls in pugofer-init.el Change these to your paths Copy this whole file to bottom of ~/.emacs.d/init.el
    
