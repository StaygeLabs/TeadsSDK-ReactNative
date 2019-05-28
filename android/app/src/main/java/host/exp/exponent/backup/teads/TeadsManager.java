package host.exp.exponent.backup.teads;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

import javax.annotation.Nullable;

public class TeadsManager extends SimpleViewManager<TeadsAdView> {

    public static final String REACT_CLASS = "TeadsAdView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public TeadsAdView createViewInstance(ThemedReactContext context) {
        return new TeadsAdView(context);
    }



    @Override
    public @Nullable
    Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        for (String event : TeadsEventEmitter.Events) {
            builder.put(event, MapBuilder.of("registrationName", event));
        }
        return builder.build();
    }
}
