(ns counter.app
  (:require [reagent.dom :as dom]
            [reagent.core :as r]))

(defn init []
  (println "The app is initializing!"))

(def current-count (r/atom 0))

(defn Application []
  [:div
    [:div "Hello." @current-count]
    [:input {:type "button" :value "Click me!"
             :on-click #(swap! current-count inc)}]])

(dom/render [Application] (js/document.getElementById "app"))

