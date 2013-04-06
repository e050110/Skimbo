'use strict';

define(["app"], function(app) {

app.filter('i18n', ['$rootScope', function($rootScope) {
  return function (input) {
    var translations = {
      'fr' : {
        'ADD_FIRST_COLUMN_SENTENCE' : 'Créez votre première colonne !',
        'ADD_FIRST_SERVICE_SENTENCE' : 'Ajoutez-y autant de services que vous souhaitez.',
        'ADD_FIRST_MODIF_SENTENCE_BEFORE_ICON' : 'Par la suite cliquez sur ',
        'ADD_FIRST_MODIF_SENTENCE_AFTER_ICON' : ' (en haut à droite de la colonne) pour la modifier.',
        'ADD_FIRST_SIZE_SENTENCE_BEFORE_ICON1' : 'Vous pouvez également cliquer sur ',
        'ADD_FIRST_SIZE_SENTENCE_AFTER_ICON1' : ' (à gauche de ',
        'ADD_FIRST_SIZE_SENTENCE_AFTER_ICON2' : ') pour modifier sa taille.',
        'ADD_NEW_COLUMN' : 'Ajouter une colonne',
        'ADD_STREAM_FOR_SOCIAL_NETWORK' : 'Ajouter un flux pour : ',
        'ALL_FIELD_REQUIRED' : 'Tous les champs sont requis.',
        'ALREADY_IN_YOUR_COLUMN' : 'Déjà présent dans cette colonne :',
        'AVAILABLE_SERVICES' : 'Services disponibles :',
        'AVAILABLE_SOCIAL_NETWORKS' : 'Réseaux sociaux disponibles :',
        'CANCEL' : 'Annuler',
        'CANT_ADD_SAME_SERVICE' : 'Vous ne pouvez pas ajouter deux fois le même service.',
        'CHANGE' : 'Modifier',
        'COLUMN_TITLE' : 'Titre de la colonne :',
        'COLUMNS' : 'Colonnes',
        'CONFIGURATION_COLUMN' : 'Préférences de la colonne',
        'CONTENT_REQUIRED' : 'Le message est requis.',
        'CREATE' : 'Créer !',
        'DELETE' : 'Supprimer',
        'MESSAGES' : 'Messages',
        'NEW_MGS_UNREAD' : 'nouveaux messages. Click pour tout lire.',
        'POSTER_REQUIRED' : 'Au moins un réseau est requis.',
        'REFRESH_DETAILS' : 'Rafraîchir/Voir les détails',
        'RESIZE_COLUMN' : 'Modifier la taille de la colonne.',
        'SHARE' : 'Partager',
        'TITLE_ALREADY_EXISTS' : 'Ce titre existe déjà.',
        'TITLE_REQUIRED' : 'Le titre est requis.',
        'TO_ADD_STREAM_IN_COLUMN' : 'Pour ajouter un flux à cette colonne, sélectionnez un ou plusieurs services ci-dessus.',
        'YOU_ARE_RECEIVING' : 'Vous recevez',
        //GOOGLE READER
        'GR_PARSE' : 'Parser les flux',
        'GR_1_BEFORE_LINK' : 'Aller sur ',
        'GR_1_LINK' : 'mes flux dans google reader',
        'GR_1_AFTER_LINK' : ' et copier le contenu.',
        'GR_2' : 'Coller le contenu dans le champ ci-dessus.',
        'GR_3' : 'Cliquer sur "Parser les flux" et gérer les flux pour cette colonne.'
      },
      'en' : {
        'ADD_FIRST_COLUMN_SENTENCE' : 'Create your first column !',
        'ADD_FIRST_SERVICE_SENTENCE' : 'Add services as you want.',
        'ADD_FIRST_MODIF_SENTENCE_BEFORE_ICON' : 'After that, click ',
        'ADD_FIRST_MODIF_SENTENCE_AFTER_ICON' : ' (top right column) to change it.',
        'ADD_FIRST_SIZE_SENTENCE_BEFORE_ICON1' : 'You can also click ',
        'ADD_FIRST_SIZE_SENTENCE_AFTER_ICON1' : ' (left ',
        'ADD_FIRST_SIZE_SENTENCE_AFTER_ICON2' : ') to change its size.',
        'ADD_NEW_COLUMN' : 'Add new column',
        'ADD_STREAM_FOR_SOCIAL_NETWORK' : 'Add a stream for this social network :',
        'ALL_FIELD_REQUIRED' : 'All fields are required.',
        'ALREADY_IN_YOUR_COLUMN' : 'Already in your column :',
        'AVAILABLE_SERVICES' : 'Services available:',
        'AVAILABLE_SOCIAL_NETWORKS' : 'Social networks available :',
        'CANCEL' : 'Cancel',
        'CANT_ADD_SAME_SERVICE' : 'You can\'t add twice same services.',
        'CHANGE' : 'Change',
        'COLUMN_TITLE' : 'Column title :',
        'COLUMNS' : 'Columns',
        'CONFIGURATION_COLUMN' : 'Column\'s configuration.',
        'CONTENT_REQUIRED' : 'The message is required !',
        'CREATE' : 'Create !',
        'DELETE' : 'Delete',
        'MESSAGES' : 'Messages',
        'NEW_MGS_UNREAD' : 'new messages. Click to read all.',
        'POSTER_REQUIRED' : 'At least one network is required.',
        'REFRESH_DETAILS' : 'Refresh/See details',
        'RESIZE_COLUMN' : 'Resize column',
        'SHARE' : 'Share',
        'TITLE_ALREADY_EXISTS' : 'This title already exists.',
        'TITLE_REQUIRED' : 'The title is required !',
        'TO_ADD_STREAM_IN_COLUMN' : 'To add a stream in this column, select one or many services above.',
        'YOU_ARE_RECEIVING' : 'You are receiving',
        //GOOGLE READER
        'GR_PARSE' : 'Parse feeds',
        'GR_1_BEFORE_LINK' : 'Go on ',
        'GR_1_LINK' : 'my google reader subscriptions',
        'GR_1_AFTER_LINK' : ' and copy content.',
        'GR_2' : 'Past content in text field above.',
        'GR_3' : 'Click on "Parse feeds" and manage feeds for this column.'
      }
    },
    currentLanguage = $rootScope.currentLanguage || 'en';
    if(translations[currentLanguage] != undefined && 
        translations[currentLanguage][input] != undefined) {
        return translations[currentLanguage][input];
    } else {
        return translations["en"][input];
    }
  }

}]);

return app;
});