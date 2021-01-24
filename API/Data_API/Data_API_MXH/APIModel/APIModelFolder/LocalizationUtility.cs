using System;
using System.Globalization;
using System.Resources;
using System.Threading;

namespace APIModel.Controller
{
    internal static class LocalizationUtility
    {
        public static string GetDefaultLanguage()
        {
            var language = Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName.Equals("vi",
                StringComparison.OrdinalIgnoreCase) ? "vi" : "en";

            return language;
        }

        public static string GetErrorDescription(ResourceManager resourceManager, string errorCode, string space = "", string language = "vi")
        {
            if (null == space)
                throw new ArgumentNullException(nameof(space));

            string key = "";
            if(string.IsNullOrEmpty(space))
                key = string.Format(CultureInfo.InvariantCulture, "{0}", errorCode);
            else
                key = string.Format(CultureInfo.InvariantCulture, "{0}_{1}", space, errorCode);

            CultureInfo cultureInfo;

            switch (language)
            {
                case "en":
                    cultureInfo = new CultureInfo("en");
                    break;
                case "vi":
                    cultureInfo = new CultureInfo("vi");
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(language), language, null);
            }

            return resourceManager.GetString(key, cultureInfo);
        }
        public static string GetBackendMessage(string errorCode, string space = "", string language = "vi")
        {
            var resourceManager = new ResourceManager(typeof(APIModel.Resources.Backend));
            return GetErrorDescription(resourceManager, errorCode, space, language);
        }
    }
}