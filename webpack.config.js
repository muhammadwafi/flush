const path                  = require("path");
var webpack                 = require("webpack");
const CleanWebpackPlugin    = require("clean-webpack-plugin");
var MiniCssExtractPlugin    = require("mini-css-extract-plugin");
var HtmlWebpackPlugin       = require('html-webpack-plugin');
var fs                      = require('fs');

/*=============================
=            ENTRY            =
===============================*/
const entry = {
    // global
    Flush: './src/assets/js/app.js',
};


/*==============================
=            OUTPUT            =
================================*/
const output = {
    path: path.join(__dirname, 'dist'),
    publicPath: "/",
    filename: "js/[name].bundle.js",
    chunkFilename: 'js/[name].bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
};



/*====================================
=            OPTIMIZATION            =
======================================*/
const optimization = {
    minimize: true,
    splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'Vendor',
                chunks: 'all',
                minSize: 0, 
                minChunks: 1, 
                reuseExistingChunk: true, 
                enforce: true
            },
        }
    },
};


/*===============================
=            PLUGINS            =
=================================*/

/*
* MULTIPLE HTML PAGES INDEXING
*/

/* Header and Footer file */
const metaHeader    = fs.readFileSync(__dirname + '/src/components/_metaHeader.html');
const contentHeader = fs.readFileSync(__dirname + '/src/components/_contentHeader.html');
const sidebarNav    = fs.readFileSync(__dirname + '/src/components/_sidebarNav.html');
const footer        = fs.readFileSync(__dirname + '/src/components/_footer.html');

let HWPConfig = new HtmlWebpackPlugin({
    file: "Dashboard.html",
    inject: "body",
    template: __dirname + "/src/Dashboard.html",
    chunks: ['Vendor', 'Flush'],
    metaHeader: metaHeader,
    contentHeader: contentHeader,
    footer: footer,
    sidebarNav: sidebarNav,
    title: "Dashboard",
});

let HtmlPagesList = [
    {
        template: 'Dashboard',
        title: 'Dashboard',
    },
    {
        template: 'Widgets',
        title: 'Widgets',
    },
    {
        template: 'Layout',
        title: 'Layout',
    },
    // UI Components
    {
        template: 'Avatars',
        title: 'Avatars',
    },
    {
        template: 'Badge',
        title: 'Badge',
    },
    {
        template: 'Button',
        title: 'Button',
    },
    {
        template: 'Alerts',
        title: 'Alerts',
    },
    {
        template: 'Card',
        title: 'Card',
    },
    {
        template: 'Gallery',
        title: 'Gallery',
    },
    {
        template: 'Tabs',
        title: 'Tabs',
    },
    {
        template: 'Tags',
        title: 'Tags',
    },
    {
        template: 'Progressbar',
        title: 'Progressbar',
    },
    {
        template: 'Popover',
        title: 'Popover',
    },
    {
        template: 'Modals',
        title: 'Modals',
    },
    {
        template: 'Maps',
        title: 'Maps',
    },
    {
        template: 'Calendar',
        title: 'Calendar',
    },
    {
        template: 'ColorsSpec',
        title: 'Colors Spec',
    },
    {
        template: 'Pagination',
        title: 'Pagination',
    },
    // Forms
    {
        template: 'BasicForms',
        title: 'Basic Forms',
    },
    {
        template: 'Selectize',
        title: 'Selectize',
    },
    // Icons
    {
        template: 'FeatherIcons',
        title: 'Feather Icons',
    },
    {
        template: 'BoxIcons',
        title: 'Box Icons',
    },
];

let multiplesFiles = HtmlPagesList.map( page => {
    return new HtmlWebpackPlugin({
        filename: page.template + '.html',
        template: __dirname + `/src/${page.template}.html`,
        metaHeader: metaHeader,
        contentHeader: contentHeader,
        footer: footer,
        sidebarNav: sidebarNav,
        title: page.title,
        inject: "body",
        chunks: ['Vendor', 'Flush'],
    });
});

const plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        tether: 'tether',
        Tether: 'tether',
        'window.Tether': 'tether',
        Popper: ['popper.js', 'default'],
        Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        Button: 'exports-loader?Button!bootstrap/js/dist/button',
        Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.css',
        chunkFilename: 'css/[name].bundle.css',
    }),
    HWPConfig
].concat(multiplesFiles);


/*===============================
=            MODULES            =
=================================*/
const modules = {
    rules: [
        /*----------  JS Loader  ----------*/
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /.*node_modules\/((?!bootstrap\/js\/src).)*$/,
            query: {
                compact: false
            },
        },
        /*----------  SCSS Loader  ----------*/
        {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                }, 
                {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                        plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }
            ],
        },
        /*----------  SVG Loader  ----------*/
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?mimetype=image/svg+xml',
        },
        /*----------  IMAGES Loader  ----------*/
        {
            test: /\.(jpg|png|gif|jpeg)$/,
            use: [{
                loader: 'file-loader?name=[name].[ext]',
                options: {
                    name: '[hash:12].[ext]',
                    publicPath: '../images/',
                    outputPath: './images/'
                }
            }]
        },
        /*----------  FONTS Loader  ----------*/
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[hash:12].[ext]',
                    publicPath: '../fonts/',
                    outputPath: './fonts/'
                }
            }]
        },
    ]
};



/*==============================
=            OTHERS            =
================================*/
const node = {
    fs: 'empty',
};
const devtool = 'source-map';
const devServer = {
    contentBase: [path.join(__dirname, "/src"), path.join(__dirname, "/src/components/")],
    watchContentBase: true,
    // compress: true,
    inline: true,
    stats: "errors-only",
    allowedHosts: ['*']
}


/*===============================
=            RESOLVE            =
=================================*/
const resolve = {
    modules: ['node_modules'],
    extensions: ['.js', '.css', '.scss']
};


/*======================================
=            EXPORT MODULES            =
========================================*/
module.exports = {
    mode: 'development',
    context: __dirname,
    entry: entry,
    output: output,
    optimization: optimization,
    plugins: plugins,
    module: modules,
    node: node,
    devtool: devtool,
    resolve: resolve,
    devServer: devServer
};
