sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'testejoule/purchase/test/integration/FirstJourney',
		'testejoule/purchase/test/integration/pages/PurchasesList',
		'testejoule/purchase/test/integration/pages/PurchasesObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchasesList, PurchasesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('testejoule/purchase') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchasesList: PurchasesList,
					onThePurchasesObjectPage: PurchasesObjectPage
                }
            },
            opaJourney.run
        );
    }
);