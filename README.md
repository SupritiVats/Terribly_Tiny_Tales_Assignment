# Terribly_Tiny_Tales_Assignment

#### Supriti Vats | 12007319 | supritivats123@gmail.com |

## Task:
Develop a frontend in Reactjs or Nextjs, which does the following:

1. On first load, only has a Submit button.

2. On clicking on Submit, it will fetch the contents of https://www.terriblytinytales.com/test.txt.

3. Parse the content and find the frequency of occurrence of each word (some words will occur only once, some twice and so on, and some will occur N times).

4. Then on the frontend, plot a histogram of the 20 most occurring words.

5. Also build an "Export" button, which when clicked will download a CSV file of the histogram data.

X-axis = top 20 words with highest occurrence Y-axis = how many times they occurred in the file

## Link of Deployement:
```
https://terribly-tiny-tales-supriti-vats.netlify.app/

```

## EXPLAINATION OF THE ASSIGNMENT:
### Imported: 
The React, useState and useEffect are imported from the React library
chart.js/auto from Chart.js library, which is used for creating charts and graphs.
papaparse is used for parsing and generating CSV files.

Code Flow: 
1. On first load, the interface only displays a "Submit" button.
2. When the "Submit" button is clicked, it triggers the `doSubmit` function.
3. Inside `doSubmit`, an HTTP request is made to fetch the contents of the URL `https://www.terriblytinytales.com/test.txt` using fetch function.
4. The fetched content is then parsed into individual words using the regular expression `/\W+/`, which splits the content based on non-word characters (e.g., punctuation, spaces).
5. The code calculates the frequency of occurrence for each word by iterating over the words and updating the `wordCount` object.
6. The `MostOccured` variable is created by sorting the `wordCount` object based on the frequency of occurrence and selecting the top 20 words.
7. The `MostOccured` data is set to the `MostWords` state variable using the `setMostWords` function.
8. The fetching state is toggled by setting `Fetching` to `true` and then back to `false` after fetching and processing the data.
9. The histogram is rendered on the frontend using Chart.js. The X-axis represents the top 20 words with the highest occurrence, and the Y-axis represents the frequency of occurrence.
10. An "Export" button is included, and when clicked, it triggers the `doExport` function.
11. Inside `doExport`, the `MostWords` data is converted to a CSV format using PapaParse.
12. The CSV data is then downloaded as a file named "data.csv" using the HTML5 `Blob` and `URL.createObjectURL` APIs.

Hence, This is the desired actions of fetching content, calculating word frequency, displaying a histogram, and enabling CSV export based on user interactions.


# Code Output after removing the error

![AFTER ERROR FIXING](https://user-images.githubusercontent.com/97901522/233856290-2670eb71-f586-4edc-a8fc-96707a0afd62.png)



# Code Optimization

#### Before Optimization of code the WrappedSingleListItem renders multiple times when we click on the list item

![BEFORE OPTIMIZATION](https://user-images.githubusercontent.com/97901522/233856355-bf4ca13a-9ec7-4858-82b3-7fdbcaa698ea.png)



#### After Optimization of code the WrappedSingleListItem renders only 2 times when we click on the list item

![AFTER OPTMIZATION](https://user-images.githubusercontent.com/97901522/233856470-4b5e0420-8b48-407f-9288-2b6bfbdc0263.png)




