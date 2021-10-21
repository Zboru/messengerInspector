# messengerInspector

Inspector for Messenger is my oldest project that I had in my head. It's first version was intended to work as CLI
application but no one wants to go through several prompts in terminal when it can be done easily in browser.

## Usage

User can use his copy of Messenger thread downloaded from [Facebook](https://facebook.com/dyi) "Download your
information" section. Download only messages from selected time period in JSON format with "Low" media quality, to keep the
download size relatively small.

After downloading all files, take all .json files from given thread and load them into app. That's all.

This is a project that serves as a start for me to learn React in practice, so don't expect perfect code and solutions.

## Tech used

|Tech|Description|
|-------------------------------|-------------------------------------------|
|[Parcel](https://parceljs.org/)|The zero configuration build tool|
|[React](https://reactjs.org/)|Library for building user interfaces|
|[TailwindCSS](https://github.com/tailwindlabs/tailwindcss)| A utility-first CSS framework for rapid UI development. |
|[clsx](https://github.com/lukeed/clsx)|A tiny utility for constructing className|
|[Fuse.js](https://github.com/krisk/Fuse)|Lightweight fuzzy-search, in JavaScript |
|[Chart.js](https://www.chartjs.org/)|Open source HTML5 Charts |
|[react-i18next](https://react.i18next.com/)|Internationalization framework for React |
|[html2canvas](https://html2canvas.hertzen.com/)|Screenshots with JavaScript |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

To develop new statistic component, create new file in `stats` folder. Then you can use ```conversation``` prop to access participants and messages from thread.

## Live

[Live demo at Github Pages](https://zboru.github.io/messengerInspector/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
