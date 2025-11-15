"use client"
import { useState, useMemo } from "react";
import Footer from "@/app/components/Footer";

export default function Home() {
    const [areaValue, setAreaValue] = useState<number>(0);
    const [heightValue, setHeightValue] = useState<number>(0);
    const [selectedService, setSelectedService] = useState<string>("construction-sites-monitoring");    
    const [constructionStage, setConstructionStage] = useState<string>("foundation");
    const [monitoringFrequency, setMonitoringFrequency] = useState<string>("daily");
    const [surveyScale, setSurveyScale] = useState<string>("1-500");
    const [requiredAccuracy, setRequiredAccuracy] = useState<number>(5);
    const [scanningResolution, setScanningResolution] = useState<string>("medium");
    const [pointCloud, setPointCloud] = useState<boolean>(false);
    const [laserIntensity, setLaserIntensity] = useState<number>(3);
    const [modelQuality, setModelQuality] = useState<string>("medium");
    const [textureQuality, setTextureQuality] = useState<string>("medium");
    const [outputFormat, setOutputFormat] = useState<string>("obj");
    const [safetyStandard, setSafetyStandard] = useState<string>("gost");
    const [inspectionType, setInspectionType] = useState<string>("routine");
    const [reportFormat, setReportFormat] = useState<string>("pdf");

    const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAreaValue(Number(event.target.value));
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeightValue(Number(event.target.value));
    };

    const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedService(event.target.value);
    };

    const handleButtonClick = () => {
        console.log('Обсуждение деталей...');
    };

    const calculatePrice = useMemo(() => {
        let basePrice = 0;
        let serviceMultiplier = 1;
        
        switch (selectedService) {
            case "construction-sites-monitoring":
                basePrice = 5000;
                switch (constructionStage) {
                    case "foundation": serviceMultiplier *= 1.0; break;
                    case "walls": serviceMultiplier *= 1.2; break;
                    case "roof": serviceMultiplier *= 1.5; break;
                    case "finishing": serviceMultiplier *= 1.3; break;
                }
                switch (monitoringFrequency) {
                    case "daily": serviceMultiplier *= 2.0; break;
                    case "weekly": serviceMultiplier *= 1.5; break;
                    case "monthly": serviceMultiplier *= 1.0; break;
                }
                break;
                
            case "topographic-survey":
                basePrice = 8000;
                switch (surveyScale) {
                    case "1-500": serviceMultiplier *= 1.5; break;
                    case "1-1000": serviceMultiplier *= 1.2; break;
                    case "1-2000": serviceMultiplier *= 1.0; break;
                }
                if (requiredAccuracy <= 2) serviceMultiplier *= 2.0;
                else if (requiredAccuracy <= 5) serviceMultiplier *= 1.5;
                else if (requiredAccuracy <= 10) serviceMultiplier *= 1.2;
                else serviceMultiplier *= 1.0;
                break;
                
            case "high-precision-scanning":
                basePrice = 12000;
                switch (scanningResolution) {
                    case "low": serviceMultiplier *= 0.8; break;
                    case "medium": serviceMultiplier *= 1.0; break;
                    case "high": serviceMultiplier *= 1.5; break;
                    case "ultra": serviceMultiplier *= 2.0; break;
                }
                if (pointCloud) serviceMultiplier *= 1.3;
                serviceMultiplier *= (0.8 + laserIntensity * 0.1);
                break;
                
            case "aerial-photo-simulation":
                basePrice = 15000;
                switch (modelQuality) {
                    case "low": serviceMultiplier *= 0.7; break;
                    case "medium": serviceMultiplier *= 1.0; break;
                    case "high": serviceMultiplier *= 1.4; break;
                    case "photorealistic": serviceMultiplier *= 2.0; break;
                }
                switch (textureQuality) {
                    case "low": serviceMultiplier *= 0.8; break;
                    case "medium": serviceMultiplier *= 1.0; break;
                    case "high": serviceMultiplier *= 1.3; break;
                }
                if (outputFormat === "fbx" || outputFormat === "gltf") serviceMultiplier *= 1.2;
                break;
                
            case "safety-control":
                basePrice = 7000;
                switch (safetyStandard) {
                    case "osha": serviceMultiplier *= 1.1; break;
                    case "gost": serviceMultiplier *= 1.0; break;
                    case "iso": serviceMultiplier *= 1.3; break;
                }
                switch (inspectionType) {
                    case "routine": serviceMultiplier *= 1.0; break;
                    case "unscheduled": serviceMultiplier *= 1.5; break;
                    case "emergency": serviceMultiplier *= 2.0; break;
                }
                break;
                
            default:
                basePrice = 5000;
        }

        const areaMultiplier = areaValue > 0 ? Math.max(1, areaValue / 100) : 1;
        
        const heightMultiplier = heightValue > 0 ? Math.max(1, heightValue / 10) : 1;

        // Итоговая цена
        const totalPrice = Math.round(basePrice * areaMultiplier * heightMultiplier * serviceMultiplier);

        return {
            base: basePrice,
            areaMultiplier,
            heightMultiplier,
            serviceMultiplier,
            total: totalPrice
        };
    }, [
        selectedService, areaValue, heightValue, constructionStage, monitoringFrequency,
        surveyScale, requiredAccuracy, scanningResolution, pointCloud, laserIntensity,
        modelQuality, textureQuality, outputFormat, safetyStandard, inspectionType
    ]);

    const renderAdditionalFields = () => {
        switch (selectedService) {
            case "construction-sites-monitoring":
                return (
                    <>
                        <label htmlFor="construction-stage">Стадия строительства</label>
                        <select 
                            name="construction-stage" 
                            id="construction-stage"
                            value={constructionStage}
                            onChange={(e) => setConstructionStage(e.target.value)}
                        >
                            <option value="foundation">Фундамент</option>
                            <option value="walls">Возведение стен</option>
                            <option value="roof">Кровля</option>
                            <option value="finishing">Отделка</option>
                        </select>

                        <label htmlFor="monitoring-frequency">Частота мониторинга</label>
                        <select 
                            name="monitoring-frequency" 
                            id="monitoring-frequency"
                            value={monitoringFrequency}
                            onChange={(e) => setMonitoringFrequency(e.target.value)}
                        >
                            <option value="daily">Ежедневно</option>
                            <option value="weekly">Еженедельно</option>
                            <option value="monthly">Ежемесячно</option>
                        </select>
                    </>
                );

            case "topographic-survey":
                return (
                    <>
                        <label htmlFor="survey-scale">Масштаб съёмки</label>
                        <select 
                            name="survey-scale" 
                            id="survey-scale"
                            value={surveyScale}
                            onChange={(e) => setSurveyScale(e.target.value)}
                        >
                            <option value="1-500">1:500</option>
                            <option value="1-1000">1:1000</option>
                            <option value="1-2000">1:2000</option>
                        </select>

                        <label htmlFor="required-accuracy">Требуемая точность (см)</label>
                        <input 
                            type="number" 
                            name="required-accuracy" 
                            id="required-accuracy" 
                            min="1" 
                            max="50" 
                            value={requiredAccuracy}
                            onChange={(e) => setRequiredAccuracy(Number(e.target.value))}
                        />
                    </>
                );

            case "high-precision-scanning":
                return (
                    <>
                        <label htmlFor="scanning-resolution">Разрешение сканирования</label>
                        <select 
                            name="scanning-resolution" 
                            id="scanning-resolution"
                            value={scanningResolution}
                            onChange={(e) => setScanningResolution(e.target.value)}
                        >
                            <option value="low">Низкое (10 см/пикс)</option>
                            <option value="medium">Среднее (5 см/пикс)</option>
                            <option value="high">Высокое (2 см/пикс)</option>
                            <option value="ultra">Ультра (1 см/пикс)</option>
                        </select>

                        <label htmlFor="point-cloud">
                            <input 
                                type="checkbox" 
                                name="point-cloud" 
                                id="point-cloud" 
                                checked={pointCloud}
                                onChange={(e) => setPointCloud(e.target.checked)}
                            />
                            Требуется облако точек
                        </label>

                        <label htmlFor="laser-intensity">Интенсивность лазера: {laserIntensity}</label>
                        <input 
                            type="range" 
                            name="laser-intensity" 
                            id="laser-intensity" 
                            min="1" 
                            max="5" 
                            step="1" 
                            value={laserIntensity}
                            onChange={(e) => setLaserIntensity(Number(e.target.value))}
                        />
                    </>
                );

            case "aerial-photo-simulation":
                return (
                    <>
                        <label htmlFor="model-quality">Качество модели</label>
                        <select 
                            name="model-quality" 
                            id="model-quality"
                            value={modelQuality}
                            onChange={(e) => setModelQuality(e.target.value)}
                        >
                            <option value="low">Низкое</option>
                            <option value="medium">Среднее</option>
                            <option value="high">Высокое</option>
                            <option value="photorealistic">Фотореалистичная</option>
                        </select>

                        <label htmlFor="texture-quality">Качество текстур</label>
                        <select 
                            name="texture-quality" 
                            id="texture-quality"
                            value={textureQuality}
                            onChange={(e) => setTextureQuality(e.target.value)}
                        >
                            <option value="low">Низкое</option>
                            <option value="medium">Среднее</option>
                            <option value="high">Высокое</option>
                        </select>

                        <label htmlFor="output-format">Формат вывода</label>
                        <select 
                            name="output-format" 
                            id="output-format"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value)}
                        >
                            <option value="obj">OBJ</option>
                            <option value="fbx">FBX</option>
                            <option value="dae">DAE</option>
                            <option value="gltf">GLTF</option>
                        </select>
                    </>
                );

            case "safety-control":
                return (
                    <>
                        <label htmlFor="safety-standard">Стандарт безопасности</label>
                        <select 
                            name="safety-standard" 
                            id="safety-standard"
                            value={safetyStandard}
                            onChange={(e) => setSafetyStandard(e.target.value)}
                        >
                            <option value="osha">OSHA</option>
                            <option value="gost">ГОСТ</option>
                            <option value="iso">ISO 45001</option>
                        </select>

                        <label htmlFor="inspection-type">Тип проверки</label>
                        <select 
                            name="inspection-type" 
                            id="inspection-type"
                            value={inspectionType}
                            onChange={(e) => setInspectionType(e.target.value)}
                        >
                            <option value="routine">Плановая</option>
                            <option value="unscheduled">Внеплановая</option>
                            <option value="emergency">Аварийная</option>
                        </select>

                        <label htmlFor="report-format">Формат отчёта</label>
                        <select 
                            name="report-format" 
                            id="report-format"
                            value={reportFormat}
                            onChange={(e) => setReportFormat(e.target.value)}
                        >
                            <option value="pdf">PDF</option>
                            <option value="word">Word</option>
                            <option value="excel">Excel</option>
                        </select>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <main>
                <div className="main">
                    <div className="form-container">
                        <label htmlFor="service-type">Тип услуги</label>
                        <select 
                            name="service" 
                            id="service-type" 
                            value={selectedService}
                            onChange={handleServiceChange}
                        >
                            <option value="construction-sites-monitoring">Мониторинг строительных объектов</option>
                            <option value="topographic-survey">Топографическая съёмка с облета</option>
                            <option value="high-precision-scanning">Высокоточное сканирование</option>
                            <option value="aerial-photo-simulation">Аэрофото моделирование</option>
                            <option value="safety-control">Контроль охраны труда и безопасности</option>
                        </select>

                        <label htmlFor="date-selection">Выбор даты</label>
                        <input type="date" name="date" id="date-selection" />

                        <label htmlFor="area-range">Площадь (м²)</label>
                        <input 
                            type="range" 
                            name="area" 
                            id="area-range" 
                            min="0" 
                            max="1000" 
                            step="100" 
                            value={areaValue}
                            onChange={handleAreaChange}
                        />
                        <span id="area-value">{areaValue} м²</span>

                        <label htmlFor="height-range">Высота (м)</label>
                        <input 
                            type="range" 
                            name="height" 
                            id="height-range" 
                            min="0" 
                            max="100" 
                            step="10" 
                            value={heightValue}
                            onChange={handleHeightChange}
                        />
                        <span id="height-value">{heightValue} м</span>

                        {renderAdditionalFields()}

                        <div className="price-calculation">
                            <div className="price-breakdown">
                                <div className="price-total">
                                    <span>
                                        <strong>Итоговая стоимость: </strong>
                                        <strong>{calculatePrice.total.toLocaleString()} ₽</strong>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="button">
                            <button type="button" aria-label="Обсудить детали" onClick={handleButtonClick}>
                                Обсудить детали
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}