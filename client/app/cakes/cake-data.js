System.register([], function(exports_1) {
    var CakeData;
    return {
        setters:[],
        execute: function() {
            CakeData = (function () {
                function CakeData() {
                }
                CakeData.prototype.createDb = function () {
                    var cakes = [
                        {
                            "id": 1,
                            "name": "Slow Cooker Chocolate Lava Cake",
                            "ingredients": [],
                            "steps": []
                        },
                        {
                            "id": 2,
                            "name": "S’mores Pizza Roll-Up",
                            "ingredients": [],
                            "steps": []
                        },
                        {
                            "id": 3,
                            "name": "S'mores Dip",
                            "ingredients": [],
                            "steps": []
                        },
                        {
                            "id": 4,
                            "name": "Easy No-Bake Chocolate-Ricotta Cake",
                            "ingredients": [
                                "combine 2 parts melted semi sweet chocolate with 3 parts ricotta cheese",
                                "layer with chocolate graham crackers until your selected dish is full",
                                "refrigerate at least 8 hours, up to 48"
                            ],
                            "steps": [
                                "8 oz semi sweet chocolate",
                                "chocolate graham crackers",
                                "12 oz ricotta cheese",
                            ]
                        },
                        {
                            "id": 5,
                            "name": "Chocolate Mousse",
                            "ingredients": [],
                            "steps": []
                        }
                    ];
                    return { cakes: cakes };
                };
                return CakeData;
            })();
            exports_1("CakeData", CakeData);
        }
    }
});
//# sourceMappingURL=cake-data.js.map