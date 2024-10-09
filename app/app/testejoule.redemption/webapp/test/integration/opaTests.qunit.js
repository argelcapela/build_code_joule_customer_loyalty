sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'testejoule/redemption/test/integration/FirstJourney',
		'testejoule/redemption/test/integration/pages/RedemptionsList',
		'testejoule/redemption/test/integration/pages/RedemptionsObjectPage'
    ],
    function(JourneyRunner, opaJourney, RedemptionsList, RedemptionsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('testejoule/redemption') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRedemptionsList: RedemptionsList,
					onTheRedemptionsObjectPage: RedemptionsObjectPage
                }
            },
            opaJourney.run
        );
    }
);