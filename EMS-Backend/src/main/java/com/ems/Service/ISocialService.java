package com.ems.Service;

import com.ems.model.Social;

public interface ISocialService {
    public Social addLinks(Social social);

    public Social getLinks(String email);
}
