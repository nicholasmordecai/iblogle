namespace Website.Widget {
    export class Traffic {

        private _trafficChart;
        private _divID: string;

        constructor(id: string) {
            this._divID = id;
            this.builtChart();
        }

        private builtChart() {
            var config = {
                type: 'line',
                data: {
                    datasets: [{
                        data: [{
                            x: new Date('11-12-2018'),
                            y: 67
                        }, {
                            x: new Date('11-11-2018'),
                            y: 81
                        }, {
                            x: new Date('11-10-2018'),
                            y: 69
                        }, {
                            x: new Date('11-9-2018'),
                            y: 113
                        },{
                            x: new Date('11-8-2018'),
                            y: 113
                        },{
                            x: new Date('11-7-2018'),
                            y: 91
                        },{
                            x: new Date('11-6-2018'),
                            y: 105
                        }],
                        fill: true,
                        borderColor: 'rgba(150, 211, 226, 1)',
                        backgroundColor: 'rgba(150, 211, 226, 0.3)'
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            display: true,
                            scaleLabel: {
                                display: false,
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: false,
                            }
                        }]
                    }
                }
            };

            var ctx = document.getElementById(this._divID)['getContext']("2d");
            this._trafficChart = new Chart(ctx, config);
        }
    }
}