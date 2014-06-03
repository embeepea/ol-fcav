#!/usr/bin/env python

### Printing script for map tiles.
###
### by John D. Morgan
### June 2, 2014
### You will need to install to following lib to parse the json:
###   	sudo yum install python-simplejson
### To-do: make the temporary image file names based on date-time stamp and
### when script runs clean out any old ones (e.g. a day old)

import cgi, simplejson, sys, urllib
import Image, ImageChops, ImageDraw, ImageFont
import os.path
import time

fontsize = 17  # starting font size
font = ImageFont.truetype("fonts/arial.ttf", fontsize)
fontBold = ImageFont.truetype("fonts/arialbd.ttf", fontsize)

# Open a file
fo = open("print_log.txt", "wb")
fo.write( "Opening print log!!\n");

params = cgi.FieldStorage()
try:
	settings = {}
	settings['width']   = int( params.getvalue("width") )
	settings['height']  = int( params.getvalue("height") )
	settings['tiles']   = simplejson.loads( params.getvalue("tiles") )
	settings['image']   = bool(int( params.getvalue("image",0) ))
	settings['legends'] = simplejson.loads( params.getvalue("legends") )
	imgXList = [] 
	imgYList = []
	fo.write("got here\n")
	#1. read in the x and y coordinates
	for tile in settings['tiles']:
		# fo.write(str(tile)+"\n")
		for key, val in tile.iteritems():
			if (str(key)=='x'):
				imgXList.append(val)
			if (str(key)=='y'):
				imgYList.append(val)		
	fo.write("min x:"+str(min(imgXList))+"\n")
	fo.write("min y:"+str(min(imgYList))+"\n")
	#3. create new canvas and past onto it
	printCount = 0
	imgX = 0 
	imgY = 0
	new_im = Image.new('RGB', (settings['width']+256,settings['height']+256))
	background = Image.new('RGBA', (1440,900), (255, 255, 255, 255))
	#4. Get all of the map tiles and assemble them accordingly
	fo.write("width:"+str(settings['width']+256)+"height:"+str(settings['height']+256)+"\n")
	for tile in settings['tiles']:
		fo.write(str(tile)+"\n")
		for key, val in tile.iteritems():
			if (str(key)=='url'):
				urllib.urlretrieve(str(val), 'print_temp/'+str(printCount)+'.jpg')
			if (str(key)=='x'):
				imgX = str(val+abs(min(imgXList)))
				fo.write("new x:"+str(imgX)+"\n")
			if (str(key)=='y'):
				imgY = str(val+abs(min(imgYList)))
				fo.write("new y:"+str(imgY)+"\n")
		im = Image.open('print_temp/'+str(printCount)+'.jpg')
		fo.write("bbox:"+str(im.getbbox())+"\n")
		# fo.write(str(im.getcolors())+"\n")
		# fo.write(str(im.mode)+"\n")
		if im.mode == 'RGBA':
			if im.getbbox() is not None:
				new_im.paste(im, (int(imgX),int(imgY)), im)
				fo.write("rgba\n")
		else:
			if im.getbbox() is not None:
				new_im.paste(im, (int(imgX),int(imgY)))
				fo.write("not rgba\n")
		printCount = printCount+1	
	#2. Download the legends and assemble them accordingly
	legendCount = 0
	legends_palette = Image.new('RGBA', (400,800), (255, 255, 255, 255))
	legend_y = 0
	for legend in settings['legends']:
		fo.write("legend: "+str(legend)+"\n")	
		for key, val in legend.iteritems():
			if (str(key)=='url'):
				urllib.urlretrieve(str(val), 'print_temp/legends/'+str(legendCount)+'.png')		
		legend_im = Image.open('print_temp/legends/'+str(legendCount)+'.png')
		# legend_im.thumbnail((100,100), Image.ANTIALIAS)
		legends_palette.paste(legend_im, (0,legend_y))
		legendCount = legendCount+1
		lgd_w,lgd_h=legend_im.size
		legend_y = legend_y+lgd_h
	#6. resize map
	new_im.thumbnail((1100,700), Image.ANTIALIAS)
	#7. save completed map on to white background
	img_w,img_h=new_im.size
	bg_w,bg_h=background.size
	offset=(20,(bg_h-img_h)/2) 
	# offset=((bg_w-img_w)/2,(bg_h-img_h)/2)
	background.paste(new_im,offset)
	background.paste(legends_palette,(img_w+30,(bg_h-img_h)/2))
	#3. Add title, date printed to background
	draw = ImageDraw.Draw(background)
	draw.text((20,(bg_h-img_h)/2-25), "U.S Forest Change Assessment Viewer", fill="black", font=fontBold)
	draw.text((20,(bg_h-(bg_h-img_h)/2)), "Printed on: "+time.strftime("%m/%d/%Y"), fill="black", font=font)				
	background.save("printed_map.jpg")	
	# new_im.save("printed_map.jpg")	
	#8. Clean up after yourself:
	dirPath = "print_temp"
	fileList = os.listdir(dirPath)
	for fileName in fileList:
		os.remove(dirPath+"/"+fileName)	
except:
	fo.write("error occured\n")
	sys.exit(1)
# Close open file
fo.close()
