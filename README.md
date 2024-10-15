# Inbox Zero Game

Welcome to **Zero Inbox Game**, a Google Apps Script project designed to gamify your email clean-up and help you achieve Inbox Zero with a smile. Turn mundane email management into a fun challenge where you earn points, level up, and reward yourself for your progress! For more insights on how this game was created, check out the [Medium article](https://medium.com/p/36b622359037).

# Overview

This repository contains:

 - `zero_inbox.gs`: The Google Apps Script code to automate the email tracking and scoring system.
 - A template [Google Spreadsheet](https://docs.google.com/spreadsheets/d/19-N7Ey6T2VD0MJjQZJTAasIyOhXgbu3D7yTlsUKuzoY/edit?usp=sharing) to log your progress, display your scores, and visualize your inbox journey.

The system collects email statistics, calculates a daily score, and logs the data to a Google Spreadsheet to help you stay motivated and on top of your emails.

# Getting Started

To get started, follow these steps:

## Step 1: Copy the Spreadsheet Template

- Open the [spreadsheet template](https://docs.google.com/spreadsheets/d/19-N7Ey6T2VD0MJjQZJTAasIyOhXgbu3D7yTlsUKuzoY/edit?usp=sharing).
- **Click File** > **Make a copy** to save your own version of the spreadsheet. This will be used to log your email stats and display your progress.
- Write down the ID of your copied spreadsheet. You will need it to configure the script later. The spreadsheet ID is the string of characters between /d/ and /edit in the URL of your copied spreadsheet.

## Step 2: Set Up Google Apps Script

- Visit [Google Apps Script](https://script.google.com/).
- Create a new project by clicking on **"+ New Project"**.
- Set a name for your project.
- Copy the code from `zero_inbox.gs` and paste it into the script editor.
- Save the script.

## Step 3: Configure the Script

- From the script editor, go to **Project Settings** (the cogwheel icon).
- Under **Script Properties**, add a new property named `SPREADSHEET_ID` with the value of the spreadsheet ID you copied. 

## Step 4: Set Up Daily Trigger

- In the script editor, create a daily trigger to automate the process:
- Click on the **clock** icon on the toolbar (Triggers).
- Add a new trigger for the `main` function.
- Set it to run **time-driven** > **Day timer** > **12 PM to 1 PM**.

# How to Play?

- **Daily Goal**: The script will run every day at noon, collecting the number of emails you received, archived, and deleted.
- **Scoring**: The fewer emails left in your inbox, the higher your daily score! Keep archiving and deleting emails to level up and earn rewards.
- **Levels & Rewards**: Track your progress in the Google Spreadsheet. Earn points, advance through levels, and celebrate your wins with self-set rewards.

# How It Works

- **Email Data Collection**: The script collects the number of emails received, archived, and deleted each day.
- **Score Calculation**: A score is calculated daily, rewarding you for keeping your inbox clear.
- **Logging to Spreadsheet**: Your daily stats are logged into the spreadsheet, allowing you to see your progress visually and stay motivated.