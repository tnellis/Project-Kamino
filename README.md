# Project Kamino
This project uses a Firebase database to keep track of Chromebook repairs and Inventory.

Input repairs add new unique keys to the database with new values that output to a table for viewing. These in turn affect the inventory entries by subtracting the part that was used.

Input inventory will update values with existent parts in the database by pulling the current value and adding the new value to it.
